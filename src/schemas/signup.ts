import z from "zod";
import { emailSchema } from "@/schemas/email";
import { passwordSchema } from "@/schemas/password";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: emailSchema,
  password: passwordSchema,
});

export type Signup = z.infer<typeof signupSchema>;

export const signupDefaults: Signup = {
  name: "",
  email: "",
  password: "",
};
