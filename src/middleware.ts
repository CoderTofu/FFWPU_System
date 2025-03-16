import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./isAuthenticated";
import { getAccessToken, getRefreshToken, refreshToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  let access_token = await getAccessToken();
  const refresh_token = await getRefreshToken();
  const pathname = request.nextUrl.pathname;

  if (!refresh_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

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
  console.log(request.headers);
  return NextResponse.next({
    headers: { Authorization: `Bearer ${access_token}` },
  });
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
    // "/logout",
  ],
};
