import { getCookieCache } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith("/auth");
  const sessionCookie = await getCookieCache(request);

  if (!sessionCookie && !isAuthRoute) {
    console.log("Proxy Defense");
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (sessionCookie && isAuthRoute) {
    console.log("Proxy Defense");
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
