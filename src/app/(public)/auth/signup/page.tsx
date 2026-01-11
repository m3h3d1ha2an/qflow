import { SignupForm } from "@/components/auth/signup-form";
import { AuthCard } from "@/components/auth-card";

const Signup = () => {
  return (
    <AuthCard title="Get Started" description="Enter your information below to signup.">
      <SignupForm />
    </AuthCard>
  );
};

export default Signup;
