import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";
import { getAccessTokenData } from "./auth";
import { UserAccountStatus } from "./@types/enums";

export async function middleware({ nextUrl }: { nextUrl: NextURL }) {
  const publicPaths = ["/", "/register"];
  const accessTokenData = await getAccessTokenData();
  const isLoggedIn = !!accessTokenData;

  if (isLoggedIn) {
    const checkoutRequired =
      nextUrl.pathname !== "/checkout" &&
      accessTokenData.account.status === UserAccountStatus.POST_REGISTRATION;
    if (checkoutRequired) {
      return NextResponse.redirect(new URL("/checkout", nextUrl));
    }

    if (publicPaths.includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  } else if (!publicPaths.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
