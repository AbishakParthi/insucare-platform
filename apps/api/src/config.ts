import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const rootEnvPath = path.resolve(process.cwd(), "../../.env");
dotenv.config({ path: rootEnvPath });

import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(24),
  JWT_REFRESH_SECRET: z.string().min(24),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  WEB_ORIGIN: z.string().default("http://localhost:3000"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().default("InsuCARE <umasrikanth@insucareindia.com>"),
  ADMIN_EMAIL: z.string().email().default("umasrikanth@insucareindia.com"),
  WEB3FORMS_ACCESS_KEY: z.string().optional()
});

export const config = schema.parse(process.env);
