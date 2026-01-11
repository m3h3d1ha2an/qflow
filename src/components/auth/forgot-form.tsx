"use client";

import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { useAppForm } from "@/components/form/hook";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/better-auth/client";
import { emailSchema } from "@/schemas/email";

export const ForgotForm = () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: { email: "" },
    validators: { onSubmit: z.object({ email: emailSchema }) },
    onSubmit: async ({ value }) => {
      await authClient.requestPasswordReset(
        {
          email: value.email,
          redirectTo: "/auth/reset",
        },
        {
          onError: (error) => {
            console.error(error);
            toast.error(error.error.message || "Failed to send password reset email");
          },
          onSuccess: () => {
            toast.success("We've sent you an email to reset your password.", {
              description: "Redirecting to login...",
            });
            setTimeout(() => {
              router.push("/auth/login");
            }, 3000);
          },
        },
      );
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="text-base" disabled={!canSubmit}>
              {isSubmitting && <Spinner />}
              Send Reset Email
            </Button>
          )}
        />
        <Button type="button" variant="outline" onClick={() => router.push("/auth/login")} className="text-base">
          <HugeiconsIcon icon={ArrowLeft02Icon} /> Back to Login
        </Button>
      </FieldGroup>
    </form>
  );
};
