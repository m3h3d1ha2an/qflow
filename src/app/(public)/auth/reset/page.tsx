import { ResetForm } from "@/components/auth/reset-form";
import { AuthCard } from "@/components/auth-card";

const Reset = async ({ searchParams }: { searchParams: Promise<{ error?: string }> }) => {
  const { error } = await searchParams;
  const title = error ? "Reset password expired" : "Reset your password";
  const description = error
    ? "The password reset link is invalid or has expired."
    : "Create a strong new password for your account.";
  return (
    <AuthCard title={title} description={description}>
      <ResetForm />
    </AuthCard>
  );
};

export default Reset;
