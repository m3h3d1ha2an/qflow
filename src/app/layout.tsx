import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BetterAuth Organization",
  description: "Organization implementation for BetterAuth",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    className="bg-white text-black selection:bg-black selection:text-white"
    lang="en"
  >
    <body
      className={cn(
        bricolageGrotesque.className,
        "min-h-dvh bg-gray-50 antialiased",
      )}
    >
      {children}
      <Toaster position="top-center" richColors />
    </body>
  </html>
);

export default RootLayout;
