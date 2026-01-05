import Image from "next/image";
import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Signup = () => {
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
        <CardTitle className="text-lg md:text-xl">Get Started</CardTitle>
        <CardDescription className="text-xs md:text-sm">Enter your information below to signup.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
};

export default Signup;
