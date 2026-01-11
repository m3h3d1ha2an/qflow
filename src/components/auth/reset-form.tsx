"use client";

import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/hook";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/better-auth/client";
import { resetSchema } from "@/schemas/reset";

export const ResetForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useAppForm({
    defaultValues: { password: "", confirmPassword: "" },
    validators: { onSubmit: resetSchema },
    onSubmit: async ({ value }) => {
      if (token === null) return;
      await authClient.resetPassword(
        {
          newPassword: value.password,
          token: token,
        },
        {
          onError: (error) => {
            console.error(error);
            toast.error(error.error.message ?? "Failed to reset password");
          },
          onSuccess: () => {
            toast.success("Password reset successfull", {
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

  if (token === null || error !== null) {
    return (
      <Button type="button" variant="outline" onClick={() => router.push("/auth/login")} className="text-base w-full">
        <HugeiconsIcon icon={ArrowLeft02Icon} /> Back to Login
      </Button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField name="password">{(field) => <field.Input label="Password" type="password" />}</form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => <field.Input label="Confirm Password" type="password" />}
        </form.AppField>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="text-base" disabled={!canSubmit}>
              {isSubmitting && <Spinner />}
              Update Password
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
