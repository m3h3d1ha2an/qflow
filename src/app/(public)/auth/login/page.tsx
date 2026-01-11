import { LoginForm } from "@/components/auth/login-form";
import { AuthCard } from "@/components/auth-card";

const Login = () => {
  return (
    <AuthCard title="Welcome back!" description="Enter your credentials below to login.">
      <LoginForm />
    </AuthCard>
  );
};

export default Login;
