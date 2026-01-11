"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/hook";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/better-auth/client";
import { signupSchema } from "@/schemas/signup";
import { signupDefaults } from "@/types/signup";

export const SignupForm = () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: signupDefaults,
    validators: { onSubmit: signupSchema },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(value, {
        onSuccess: () => {
          const newTargetTime = Date.now() + 30 * 1000;
          localStorage.setItem("email_resend_target", newTargetTime.toString());
          sessionStorage.setItem("pending_verification_email", value.email);
          router.replace("/auth/verify");
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.error.message || "Failed to send verification email");
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField name="name">{(field) => <field.Input label="Name" />}</form.AppField>
        <form.AppField name="email">{(field) => <field.Input label="Email" type="email" />}</form.AppField>
        <form.AppField name="password">{(field) => <field.Input label="Password" type="password" />}</form.AppField>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="text-base" disabled={!canSubmit}>
              {isSubmitting && <Spinner />}
              Create Account
            </Button>
          )}
        />
        <div className="flex items-center justify-center text-sm">
          Already have an account?
          <Link href="/auth/login">
            <Button type="button" variant="link" className="text-sm">
              Login
            </Button>
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
};
