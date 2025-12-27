import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/queries";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) {
    console.log("Layout Defense");
    redirect("/auth/signin");
  }
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      {children}
    </main>
  );
};
export default PrivateLayout;
