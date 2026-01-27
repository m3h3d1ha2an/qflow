"use client";

import { CustomerSupportIcon, LogoutSquare01Icon, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/better-auth/client";
import { SettingsDialog } from "./settings-dialog";

export const UserDropdown = () => {
  const { data } = authClient.useSession();
  const [open, onOpenChange] = useState(false);
  const user = data?.user ?? { name: "Shadcn", email: "shadcn@example.com" };
  const router = useRouter();
  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-8 rounded-full">
            <AvatarImage src={data?.user.image || "https://github.com/shadcn.png"} />
            <AvatarFallback>QFlow</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full">
          <DropdownMenuItem>
            <Avatar className="size-8 rounded-full">
              <AvatarImage src={data?.user.image || "https://github.com/shadcn.png"} />
              <AvatarFallback>QFlow</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="font-medium">{user.name}</span>
              <span className="text-muted-foreground text-xs">{user.email}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onOpenChange(true)}>
            <HugeiconsIcon icon={User} />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={CustomerSupportIcon} />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleSignout}>
            <HugeiconsIcon icon={LogoutSquare01Icon} />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsDialog open={open} onOpenChange={onOpenChange} />
    </>
  );
};
