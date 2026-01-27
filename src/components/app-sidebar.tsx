"use client";

import {
  ChevronDown,
  LeftToRightListStarIcon,
  LogoutSquare01Icon,
  MoreVertical,
  Settings01Icon,
  User,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/better-auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const AppSidebar = () => {
  const { isMobile } = useSidebar();
  const { data } = authClient.useSession();
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
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-xl font-bold [&_svg]:size-5 border">
              <HugeiconsIcon icon={LeftToRightListStarIcon} />
              QFlow
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuButton />}>
                <Avatar className="size-8 rounded-full">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                </div>
                <HugeiconsIcon icon={MoreVertical} className="ml-auto size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuItem>
                  <Avatar className="size-8 rounded-full">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HugeiconsIcon icon={User} />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HugeiconsIcon icon={Settings01Icon} />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleSignout}>
                  <HugeiconsIcon icon={LogoutSquare01Icon} />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
