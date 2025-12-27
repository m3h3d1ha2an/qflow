import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/queries";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getCurrentSession();
  if (session) {
    console.log("Layout Defense");
    redirect("/app/dashboard");
  }
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      {children}
    </main>
  );
};
export default PublicLayout;
