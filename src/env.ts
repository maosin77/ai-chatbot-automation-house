import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_URL: z.url(),
  NEXTAUTH_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
