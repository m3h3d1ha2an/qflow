"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/hook";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/better-auth/client";
import { loginSchema } from "@/schemas/login";
import { loginDefaults } from "@/types/login";

export const LoginForm = () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: loginDefaults,
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(value, {
        onSuccess: () => {
          router.push("/app/dashboard");
        },
        onError: (error) => {
          if (error.error.code === "EMAIL_NOT_VERIFIED") {
            const toastId = toast.loading("Email not verified.", {
              description: "Redirecting to verification...",
            });

            // Set your storage items for the Verify page
            const newTargetTime = Date.now() + 30 * 1000;
            localStorage.setItem("email_resend_target", newTargetTime.toString());
            sessionStorage.setItem("pending_verification_email", value.email);

            router.replace("/auth/verify");
            toast.success("Check your inbox for verification email.", {
              id: toastId,
            });
            return;
          }
          toast.error(error.error.message ?? "Something went wrong");
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
        <form.AppField name="email">{(field) => <field.Input label="Email" type="email" />}</form.AppField>
        <form.AppField name="password">{(field) => <field.Input label="Password" type="password" />}</form.AppField>
        <Field orientation="horizontal">
          <form.AppField name="rememberMe">
            {(field) => <field.Checkbox label="Remember me" horizontal />}
          </form.AppField>
          <Link href="/auth/forgot">
            <Button type="button" variant="link" className="text-sm">
              Forgot password?
            </Button>
          </Link>
        </Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="text-base" disabled={!canSubmit}>
              {isSubmitting && <Spinner />}
              Login
            </Button>
          )}
        />
        <div className="flex items-center justify-center text-sm">
          Don't have an account?
          <Link href="/auth/signup">
            <Button type="button" variant="link" className="text-sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
};
