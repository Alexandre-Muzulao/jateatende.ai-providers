import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = !!auth?.user;
  if (isLoggedIn) {
    const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    if (isOnDashboard) return true;
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }
  return false;
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
