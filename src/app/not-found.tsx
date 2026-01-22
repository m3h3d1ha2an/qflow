import Link from "next/link";
import { Button } from "@/components/ui/button";

const notFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="relative mb-6 text-center">
        <h1 className="text-foreground mb-3 text-4xl/[1.1] font-semibold md:text-5xl/[1.1]">404</h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg">Oops! How did you land here?</p>
      </div>
      <div className="relative text-center">
        <Button size="sm">
          <Link href="/app/dashboard">Take me back</Link>
        </Button>
      </div>
    </div>
  );
};

export default notFound;
