import { hash, type Options, verify } from "@node-rs/argon2";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { emailVerificationHtml, emailVerificationText } from "@/lib/emails/email-verification";
import { resetPasswordHtml, resetPasswordText } from "@/lib/emails/reset-password";
import { db } from "@/lib/prisma";
import { transporter } from "@/lib/transporter";

const options: Options = {
  memoryCost: 524288,
  timeCost: 3,
  parallelism: 4,
  outputLen: 32,
};

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: async (password) => await hash(password, options),
      verify: async ({ hash, password }) => await verify(hash, password, options),
    },
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 1, // Seconds * Minutes * Hours * Days
    sendResetPassword: async ({ user: { name, email }, url }) => {
      await transporter.sendMail({
        from: "BetterAuth Organization <support@betterauth-org.com",
        to: email,
        subject: "Reset your password",
        text: await resetPasswordText(name, url, "24 hours"),
        html: await resetPasswordHtml(name, url, "24 hours"),
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    expiresIn: 60 * 60 * 1, // Seconds * Minutes * Hours * Days
    sendVerificationEmail: async ({ user: { name, email }, url }) => {
      await transporter.sendMail({
        from: "BetterAuth Organization <support@betterauth-org.com",
        to: email,
        subject: "Verify your email",
        text: await emailVerificationText(name, url, "24 hours"),
        html: await emailVerificationHtml(name, url, "24 hours"),
      });
    },
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

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
