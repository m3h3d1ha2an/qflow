"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/better-auth/client";

const RESEND_COOLDOWN = 30;

const VerifyPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [countdown, setCountdown] = useState(0);

  // 1. Handle Email Retrieval & Initial Timer
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("pending_verification_email");

    if (!storedEmail) {
      // If the user arrived here by mistake, send them back
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.replace("/auth/signup");
      }
      return;
    }
    setEmail(storedEmail);

    // Check if there is a pending countdown from a previous session/refresh
    const targetTime = localStorage.getItem("email_resend_target");
    if (targetTime) {
      const remaining = Math.round((Number(targetTime) - Date.now()) / 1000);
      if (remaining > 0) setCountdown(remaining);
    }
  }, [router]);

  // 2. Countdown Logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || !email) return;

    const { error } = await authClient.sendVerificationEmail({ email });

    if (!error) {
      toast.success("Verification email resent!");
      const newTargetTime = Date.now() + RESEND_COOLDOWN * 1000;
      localStorage.setItem("email_resend_target", newTargetTime.toString());
      setCountdown(RESEND_COOLDOWN);
    } else {
      toast.error(error.message ?? "Something went wrong");
    }
  };

  const handleChangeEmail = () => {
    sessionStorage.removeItem("pending_verification_email");
    localStorage.removeItem("email_resend_target"); // Clear timer too
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      // This sends them exactly where they came from (Signup OR Login)
    } else {
      router.replace("/auth/signup");
      // Fallback if they opened the verify link in a new isolated tab
    }
  };

  return (
    <AuthCard
      title="Verify Your Email"
      description="We sent a verification link to your email. Please check your inbox."
    >
      <div className="text-center space-y-4">
        <Input type="email" value={email || "Loading..."} className="w-full text-center bg-muted" readOnly />

        <Button
          onClick={handleResend}
          disabled={countdown > 0 || !email}
          className="w-full transition-all duration-300"
        >
          {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
        </Button>

        <div className="text-sm text-muted-foreground">
          Wrong email address?{" "}
          <button type="button" onClick={handleChangeEmail} className="text-primary hover:underline font-medium">
            Change now
          </button>
        </div>
      </div>
    </AuthCard>
  );
};

export default VerifyPage;
