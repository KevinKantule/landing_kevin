import * as Sentry from '@sentry/node';
import { Express, Request, Response, NextFunction } from 'express';

/**
 * Sentry middleware for Express
 * Captures errors and provides request context
 */
export function attachSentryMiddleware(app: Express) {
  // Request handler middleware - tracks requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    addBreadcrumb(`${req.method} ${req.path}`, { ip: req.ip });
    next();
  });

  // Custom error catching middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Don't capture 404 errors for unmatched routes
    if (res.statusCode === 404) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    // Log to Sentry with context
    Sentry.captureException(err, {
      contexts: {
        request: {
          method: req.method,
          url: req.url,
          headers: req.headers,
          ip: req.ip,
        },
      },
    });

    // Respond to client
    res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    });
  });

  // Async error handler wrapper
  return {
    asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
      return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
      };
    },
  };
}

/**
 * Set user context for Sentry
 * Call this when you have user information
 */
export function setUserContext(userId?: string, email?: string, username?: string) {
  if (!userId) {
    Sentry.setUser(null);
    return;
  }

  Sentry.setUser({
    id: userId,
    email,
    username,
  });
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    message,
    data,
    timestamp: Date.now() / 1000,
  });
}
