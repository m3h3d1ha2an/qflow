import { ForgotForm } from "@/components/auth/forgot-form";
import { AuthCard } from "@/components/auth-card";

const Forgot = () => {
  return (
    <AuthCard title="Forgot Password?" description="Enter your email to receive a password reset email.">
      <ForgotForm />
    </AuthCard>
  );
};

export default Forgot;
