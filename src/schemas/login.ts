import z from "zod";
import { emailSchema } from "@/schemas/email";
import { passwordSchema } from "@/schemas/password";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean(),
});

export type Login = z.infer<typeof loginSchema>;

export const loginDefaults: Login = {
  email: "",
  password: "",
  rememberMe: false,
};
