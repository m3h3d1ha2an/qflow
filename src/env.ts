import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URL: z.url().refine((url) => url.startsWith("postgres://") || url.startsWith("postgresql://"), {
      error: "DATABASE_URL must be a PostgreSQL URL",
    }),
    BETTER_AUTH_SECRET: z.base64("Secret must be a valid standard Base64 string"),
    BETTER_AUTH_URL: z.url("Please provide a valid URL"),
  },
  experimental__runtimeEnv: process.env,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
