import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthCardProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <Card className="relative w-full max-w-sm overflow-hidden">
      <CardHeader className="text-center">
        <Image
          alt="Logo"
          height={50}
          src="https://github.com/m3h3d1ha2an/betterauth-nextjs/blob/main/public/betterauth.png?raw=true"
          width={50}
          className="mx-auto mb-2"
        />
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-xs md:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
