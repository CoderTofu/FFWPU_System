import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./isAuthenticated";
import {
  getAccessToken,
  getRefreshToken,
  refreshToken,
  setTokens,
} from "./lib/auth";

export async function middleware(request: NextRequest) {
  let access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!access_token && refresh_token) {
    access_token = await refreshToken(refresh_token);
  }
  if (!pathname.startsWith("/api")) {
    if (access_token) {
      if (pathname.startsWith("/login"))
        return NextResponse.redirect(new URL("/member", request.url));
      return NextResponse.next();
    }
    if (pathname.startsWith("/login")) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/member/:path*",
    "/donation/:path*",
    "/login",
    "/cms/:path*",
    "/worship/:path*",
    "/reporting/:path*",
    "/event/:path*",
    "/blessings/:path*",
    "/api/:path*",
  ],
};
