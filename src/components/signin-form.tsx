"use client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const signInSchema = z.object({
  username: z
    .string()
    .min(5, { error: "Username must be at least 5 characters long." })
    .max(30, { error: "Username must be at most 30 characters long." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(128, { error: "Password must be at most 128 characters long." }),
});

export const SigninForm = () => {
  const form = useForm({
    defaultValues: { username: "", password: "" },
    validators: { onSubmit: signInSchema },
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully");
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldSet>
        <FieldGroup>
          <Field orientation="responsive" data-invalid>
            <FieldLabel htmlFor="username" className="text-sm">
              Username
            </FieldLabel>
            <FieldError>Choose a unique username for your account.</FieldError>
            <Input
              id="username"
              type="text"
              className="text-base! shadow-xs"
              aria-invalid
            />
          </Field>
          <Field orientation="responsive" data-invalid>
            <FieldLabel htmlFor="password" className="text-sm">
              Password
            </FieldLabel>
            <FieldError>Must be at least 8 characters long.</FieldError>
            <Input
              id="password"
              type="password"
              className="text-base! shadow-xs"
              aria-invalid
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
