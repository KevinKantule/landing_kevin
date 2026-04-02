import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import * as genai from "@google/genai";
import { env } from "./src/config/env.js";
import { initializeSecurityMiddleware } from "./src/middleware/security.js";
import { initializeSentry } from "./src/config/sentry.js";
import { attachSentryMiddleware } from "./src/middleware/sentry.js";

const GoogleGenerativeAI = (genai as any).GoogleGenerativeAI;

// Initialize Sentry before anything else
initializeSentry();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Attach Sentry middleware (must be early)
  attachSentryMiddleware(app);

  // Initialize security middleware
  const { limiters, csrfProtection } = initializeSecurityMiddleware(app);

  // Get CSRF token endpoint
  app.get("/api/csrf-token", csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  // API Route for Feedback (with CSRF protection)
  app.post("/api/feedback", limiters.feedback, csrfProtection, async (req, res) => {
    const { message, projectContext } = req.body;

    // Basic Input Validation
    if (!message || typeof message !== "string" || message.length > 1000) {
      return res.status(400).json({ success: false, error: "Mensaje inválido o demasiado largo." });
    }

    const targetEmail = "kevin.kantule@gmail.com";
    const contextInfo = projectContext ? `Proyecto: ${projectContext}` : "General / Sin contexto específico";
    const timestamp = new Date().toLocaleString("es-PA", { timeZone: "America/Panama" });

    console.log(`[Feedback] Recibido para ${targetEmail}:`, { message, contextInfo });

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: env.EMAIL_USER,
      to: targetEmail,
      subject: `PORTAFOLIO: Nuevo mensaje sobre [${projectContext || "General"}] - ${timestamp}`,
      text: `Has recibido un nuevo mensaje de tu portafolio:\n\nFecha: ${timestamp}\nContexto: ${contextInfo}\n\nMensaje: "${message}"`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0033a7; margin-bottom: 20px;">Nuevo mensaje del Portafolio</h2>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 14px; color: #666; margin: 0 0 5px 0;"><strong>Fecha:</strong> ${timestamp}</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 10px 0;"><strong>Contexto:</strong> ${contextInfo}</p>
            <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; margin: 0; padding-top: 10px; border-top: 1px solid #ddd;">"${message}"</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Enviado desde tu portafolio profesional.</p>
        </div>
      `,
    };

    try {
      if (env.EMAIL_USER && env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "¡Pensamiento enviado por correo!" });
      } else {
        console.warn("[Feedback] EMAIL_USER o EMAIL_PASS no configurados en el entorno.");
        res.json({
          success: true,
          message: "Simulado: Configura EMAIL_USER y EMAIL_PASS en Secretos para recibirlo en kevin.kantule@gmail.com",
          simulated: true,
        });
      }
    } catch (error) {
      console.error("[Feedback] Error al enviar correo:", error);
      res.status(500).json({ success: false, error: "Error al procesar el envío." });
    }
  });

  // API Route for AI Chat (with CSRF protection and rate limiting)
  app.post("/api/ai-chat", limiters.aiChat, csrfProtection, async (req, res) => {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== "string" || message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: "Mensaje inválido o demasiado largo (máx 5000 caracteres).",
      });
    }

    // Check if API key is configured
    if (!env.GEMINI_API_KEY) {
      console.warn("[AI Chat] GEMINI_API_KEY no configurada");
      return res.status(500).json({
        success: false,
        error: "Servicio de IA no disponible actualmente.",
      });
    }

    try {
      const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(message);
      const responseText = result.response.text();

      res.json({
        success: true,
        response: responseText,
      });
    } catch (error) {
      console.error("[AI Chat] Error:", error);
      res.status(500).json({
        success: false,
        error: "Error al procesar la solicitud de IA.",
      });
    }
  });

  // Health check endpoint (not rate-limited)
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(env.PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
