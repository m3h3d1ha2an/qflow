import Image from "next/image";
import { SigninForm } from "@/components/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignIn = () => {
  return (
    <Card className="relative w-full max-w-sm overflow-hidden">
      <CardHeader className="text-center">
        <Image
          alt="Logo"
          height={50}
          src="https://github.com/m3h3d1ha2an/betterauth-nextjs/blob/main/public/betterauth.png?raw=true"
          width={50}
          className="mx-auto"
        />
        <CardTitle className="text-lg md:text-xl">Welcome back!</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information below to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm />
      </CardContent>
    </Card>
  );
};

export default SignIn;
