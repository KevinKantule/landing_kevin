import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import validator from "validator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for Vite dev server compatibility
  }));

  // CORS Configuration
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.APP_URL : '*',
    methods: ['POST'],
  }));

  // Rate Limiting to prevent spam
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: { success: false, error: "Demasiados mensajes enviados. Por favor, intenta más tarde." }
  });

  app.use("/api/", limiter);
  app.use(express.json({ limit: '5kb' })); // Limit body size

  // API Route for Feedback
  app.post("/api/feedback", async (req, res) => {
    let { message, name, email, phone, projectContext } = req.body;
    
    // Input Validation & Sanitization
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: "El mensaje es obligatorio." });
    }
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ success: false, error: "El nombre es obligatorio." });
    }
    if (!email || typeof email !== 'string' || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: "Un correo electrónico válido es obligatorio." });
    }

    // Sanitize inputs
    message = validator.escape(message.trim());
    name = validator.escape(name.trim());
    email = validator.normalizeEmail(email) || email;
    phone = phone ? validator.escape(String(phone).trim()) : "No proporcionado";
    
    if (message.length < 5) {
      return res.status(400).json({ success: false, error: "El mensaje es demasiado corto." });
    }

    const targetEmail = "kevin.kantule@gmail.com";
    const contextInfo = projectContext ? `Proyecto: ${projectContext}` : "General / Sin contexto específico";
    const timestamp = new Date().toLocaleString('es-PA', { timeZone: 'America/Panama' });

    console.log(`[Feedback] Recibido de ${name} (${email}):`, { message, contextInfo });

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: targetEmail,
      subject: `PORTAFOLIO: Mensaje de ${name} sobre [${projectContext || 'General'}]`,
      text: `Has recibido un nuevo mensaje de tu portafolio:\n\nFecha: ${timestamp}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nContexto: ${contextInfo}\n\nMensaje: "${message}"`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0033a7; margin-bottom: 20px;">Nuevo mensaje del Portafolio</h2>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 14px; color: #666; margin: 0 0 5px 0;"><strong>Fecha:</strong> ${timestamp}</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 5px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 5px 0;"><strong>Teléfono:</strong> ${phone}</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 10px 0;"><strong>Contexto:</strong> ${contextInfo}</p>
            <div style="padding-top: 10px; border-top: 1px solid #ddd;">
              <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; margin: 0;">"${message}"</p>
            </div>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Enviado desde tu portafolio profesional.</p>
        </div>
      `,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "¡Mensaje enviado correctamente!" });
      } else {
        console.warn("[Feedback] EMAIL_USER o EMAIL_PASS no configurados.");
        res.json({ 
          success: true, 
          message: "Simulado: Configura EMAIL_USER y EMAIL_PASS para recibirlo.",
          simulated: true 
        });
      }
    } catch (error) {
      console.error("[Feedback] Error al enviar correo:", error);
      res.status(500).json({ success: false, error: "Error al procesar el envío del mensaje." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
