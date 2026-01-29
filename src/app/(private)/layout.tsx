import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/queries";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full mx-2">
        <AppHeader />
        <div className="border mt-2 p-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default PrivateLayout;
