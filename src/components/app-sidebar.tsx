"use client";

import {
  Analytics,
  Appointment02Icon,
  LeftToRightListDashIcon,
  LogoutSquare01Icon,
  MoreVertical,
  Queue02Icon,
  ServiceIcon,
  Settings01Icon,
  User,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/better-auth/client";
import { SettingsDialog } from "./settings-dialog";

type NavItem = { title: string; url: Route; icon: HugeiconsIconProps["icon"] };

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = authClient.useSession();
  const [open, onOpenChange] = useState(false);

  const user = data?.user ?? { name: "Shadcn", email: "shadcn@example.com" };

  const handleSignout = async () => {
    await authClient.signOut(
      {},
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    );
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: Analytics,
    },
    {
      title: "Services",
      url: "/app/services",
      icon: ServiceIcon,
    },
    {
      title: "Staff Management",
      url: "/app/staff",
      icon: UserGroupIcon,
    },
    {
      title: "Appointments",
      url: "/app/appointments",
      icon: Appointment02Icon,
    },
    {
      title: "Waiting Queue",
      url: "/app/queue",
      icon: Queue02Icon,
    },
    {
      title: "Activity Log",
      url: "/app/logs",
      icon: LeftToRightListDashIcon,
    },
  ];

  return (
    <>
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <h2 className="font-semibold text-2xl">
                  Q <span className="font-mono text-xl">Flow Manager Inc</span>
                </h2>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-2.5">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="[&_li]:my-1">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.url === pathname}
                      render={<Link href={item.url} />}
                      className="h-7  data-active:bg-black data-active:text-white hover:bg-black hover:text-white"
                    >
                      <HugeiconsIcon icon={item.icon} className="size-3.5" />
                      <span className="text-sm">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger render={<SidebarMenuButton />}>
                  <Avatar className="size-8 rounded-full">
                    <AvatarImage src={data?.user.image || "https://github.com/shadcn.png"} />
                    <AvatarFallback>QFlow</AvatarFallback>
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
                      <AvatarImage src={data?.user.image || "https://github.com/shadcn.png"} />
                      <AvatarFallback>QFlow</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onOpenChange(true)}>
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
      <SettingsDialog open={open} onOpenChange={onOpenChange} />
    </>
  );
};
