import { prismaAdapter } from "better-auth/adapters/prisma";
import { type BetterAuthOptions, betterAuth } from "better-auth/minimal";
import { db } from "@/lib/prisma";
import { sendResetPasswordEmail, sendVerificationEmail } from "./email";
import { betterAuthHooks } from "./hooks";
import { passwordOptions } from "./password";
import { betterAuthPlugins } from "./plugins";
import { betterAuthSession } from "./session";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: passwordOptions,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 1, // Seconds * Minutes * Hours * Days
    sendResetPassword: sendResetPasswordEmail,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    expiresIn: 60 * 60 * 1, // Seconds * Minutes * Hours * Days
    sendVerificationEmail: sendVerificationEmail,
  },
  session: betterAuthSession,
  hooks: betterAuthHooks,
  plugins: betterAuthPlugins,
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
export type AuthOptions = BetterAuthOptions;
