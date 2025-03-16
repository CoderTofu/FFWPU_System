import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./isAuthenticated";
import { getAccessToken, getRefreshToken, setTokens } from "./lib/auth";

export async function middleware(request: NextRequest) {
  let access_token = await getAccessToken();
  const refresh_token = await getRefreshToken();
  const pathname = request.nextUrl.pathname;

  if (!access_token && refresh_token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/refresh-token/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refresh_token }),
      }
    );
    if (response.ok) {
      const { access } = await response.json();
      await setTokens(access, refresh_token);
      access_token = access;
    }
  }

  if (access_token) {
    if (pathname.startsWith("/login"))
      return NextResponse.redirect(new URL("/member", request.url));
    return NextResponse.next();
  }
  if (pathname.startsWith("/login")) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
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
    // "/logout",
  ],
};
