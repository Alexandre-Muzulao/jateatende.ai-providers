import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecrypt, JWTPayload } from "jose";
import { auth } from "./auth";

const { JWT_SECRET } = process.env;
const publicPaths = ["/", "/register"];

interface AccessTokenData extends JWTPayload {
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  account: {
    updatedAt: Date;
    status: "ACTIVE" | "INACTIVE" | "POST_REGISTRATION";
  };
}

async function getAccessTokenData(): Promise<AccessTokenData | null> {
  const accessToken = (await auth())?.accessToken;
  if (accessToken) {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    try {
      const { payload }: { payload: AccessTokenData } = await jwtDecrypt(
        accessToken,
        secretKey
      );

      return payload;
    } catch (error) {
      return null;
    }
  }
  return null;
}

export async function middleware({ nextUrl }: { nextUrl: NextURL }) {
  const accessTokenData = await getAccessTokenData();
  const isLoggedIn = !!accessTokenData;

  if (isLoggedIn) {
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
