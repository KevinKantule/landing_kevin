import * as Sentry from '@sentry/node';
import { env } from './env.js';

/**
 * Initialize Sentry for error tracking and monitoring
 * Only initialize if SENTRY_DSN is configured
 */
export function initializeSentry() {
  const sentryDsn = process.env.SENTRY_DSN;

  if (!sentryDsn) {
    console.log('[Sentry] SENTRY_DSN not configured. Error tracking disabled.');
    return null;
  }

  try {
    Sentry.init({
      dsn: sentryDsn,
      environment: env.NODE_ENV,
      tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,
      debug: env.NODE_ENV === 'development',
    });

    console.log('[Sentry] Error tracking initialized');
    return Sentry;
  } catch (error) {
    console.error('[Sentry] Failed to initialize:', error);
    return null;
  }
}

/**
 * Capture exception with context
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (!Sentry) {
    console.error('[Error]', error.message, context);
    return;
  }

  Sentry.captureException(error, {
    contexts: context ? { custom: context } : undefined,
  });
}

/**
 * Capture message with level
 */
export function captureMessage(message: string, level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info') {
  if (!Sentry) {
    console.log(`[${level.toUpperCase()}]`, message);
    return;
  }

  Sentry.captureMessage(message, level);
}

export { Sentry };
