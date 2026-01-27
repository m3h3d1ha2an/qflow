import { emailVerificationHtml, emailVerificationText } from "@/lib/emails/email-verification";
import { resetPasswordHtml, resetPasswordText } from "@/lib/emails/reset-password";
import { welcomeMessageHtml, welcomeMessageText } from "@/lib/emails/welcome-message";
import { transporter } from "@/lib/transporter";
import type { AuthOptions } from "./server";

type SendResetPasswordEmailFunction = NonNullable<AuthOptions["emailAndPassword"]>["sendResetPassword"];
type SendVerificationEmailFunction = NonNullable<AuthOptions["emailVerification"]>["sendVerificationEmail"];
type AfterEmailVerificaton = NonNullable<AuthOptions["emailVerification"]>["afterEmailVerification"];

export const sendResetPasswordEmail: SendResetPasswordEmailFunction = async ({ user: { name, email }, url }) => {
  void transporter.sendMail({
    from: "QFlow",
    to: email,
    subject: "Reset your password",
    text: await resetPasswordText(name, url, "24 hours"),
    html: await resetPasswordHtml(name, url, "24 hours"),
  });
};

export const sendVerificationEmail: SendVerificationEmailFunction = async ({ user: { name, email }, url }) => {
  void transporter.sendMail({
    from: "QFlow",
    to: email,
    subject: "Verify your email",
    text: await emailVerificationText(name, url, "24 hours"),
    html: await emailVerificationHtml(name, url, "24 hours"),
  });
};

export const afterEmailVerification: AfterEmailVerificaton = async ({ name, email }) => {
  void transporter.sendMail({
    from: "QFlow",
    to: email,
    subject: "Welcome to QFlow!",
    text: await welcomeMessageText(name),
    html: await welcomeMessageHtml(name),
  });
};
