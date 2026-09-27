import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  GITHUB_TOKEN: z.string().optional(),
  CLIENT_URL: z.string().default("http://localhost:5173"),
  MAX_FILE_SIZE_MB: z.coerce.number().default(5)
});

export const env = schema.parse(process.env);
