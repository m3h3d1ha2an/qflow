import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async () => await Promise.resolve(),
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async () => await Promise.resolve(),
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // Seconds * Minutes * Hours * Days
    updateAge: 60 * 60 * 24 * 1, // Seconds * Minutes * Hours * Days
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 1, // Seconds * Minutes * Hours * Days
    },
  },
  plugins: [nextCookies()],
});
