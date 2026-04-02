import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Express, RequestHandler } from 'express';
import express from 'express';

/**
 * Enhanced rate limiter configuration
 * Different limits for different routes
 */
export const createRateLimiters = () => ({
  // General API rate limiter: 100 requests per 15 minutes
  api: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, error: 'Demasiadas solicitudes. Intenta más tarde.' },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health';
    },
  }),

  // Feedback endpoint: 10 requests per 15 minutes per IP
  feedback: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
      success: false,
      error: 'Demasiados mensajes. Por favor, espera un momento.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      // Rate limit by IP + optional user identifier
      return req.ip || 'unknown';
    },
  }),

  // AI Chat endpoint: 20 requests per 15 minutes (more generous)
  aiChat: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
      success: false,
      error: 'Límite de solicitudes de IA excedido. Intenta más tarde.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),

  // Strict limiter for auth attempts: 5 per 15 minutes
  auth: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, error: 'Demasiados intentos. Intenta más tarde.' },
    standardHeaders: true,
    legacyHeaders: false,
  }),
});

/**
 * CSRF protection middleware
 * Protects POST, PUT, DELETE requests
 */
export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});

/**
 * Middleware para obtener token CSRF
 * Retorna el token en respuesta JSON
 */
export const csrfTokenMiddleware: RequestHandler = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

/**
 * Initialize security middleware
 */
export function initializeSecurityMiddleware(app: Express) {
  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production',
    })
  );

  // Cookie parser (required for CSRF)
  app.use(cookieParser());

  // Body parser with size limit
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ limit: '10kb', extended: true }));

  // CSRF protection for state-changing operations
  app.use(csrfProtection);

  return {
    limiters: createRateLimiters(),
    csrfProtection,
  };
}
