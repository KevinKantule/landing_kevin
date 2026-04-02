import { z } from 'zod';

const envSchema = z.object({
  // Server
  PORT: z.string().default('3000').transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Email Configuration
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().optional(),

  // API Keys
  GEMINI_API_KEY: z.string().optional(),

  // Security (optional, but validates if present)
  DISABLE_HMR: z.string().transform(v => v === 'true').optional(),
});

type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  try {
    const env = envSchema.parse(process.env);

    // Log validation results
    console.log('[ENV] Environment variables validated successfully');

    // Warn if critical env vars are missing in production
    if (env.NODE_ENV === 'production') {
      const criticalVars = ['EMAIL_USER', 'EMAIL_PASS'];
      const missing = criticalVars.filter(v => !process.env[v]);

      if (missing.length > 0) {
        console.warn(
          `[ENV] WARNING: Production mode but missing env vars: ${missing.join(', ')}`
        );
      }
    }

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[ENV] Environment validation failed:');
      error.issues.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw error;
  }
}

export const env = validateEnv();
