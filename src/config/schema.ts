import { z } from 'zod';

const baseEnvSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535),
  DATABASE_URL: z.string().url()
});

export const jwtEnvSchema = z.object({
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES: z.coerce.number().positive(),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES: z.coerce.number().positive()
});

export const appEnvSchema = baseEnvSchema.merge(jwtEnvSchema);
