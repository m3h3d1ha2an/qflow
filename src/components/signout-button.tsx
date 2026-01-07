"use client";

import { Logout } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/client";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export const SignoutButton = () => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsSigningOut(true);
        },
        onResponse: () => {
          setIsSigningOut(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Button onClick={handleSignout} className="text-sm hover:bg-blue-800" disabled={isSigningOut}>
      {isSigningOut ? <Spinner /> : <HugeiconsIcon icon={Logout} className="size-4" />} Sign out
    </Button>
  );
};
