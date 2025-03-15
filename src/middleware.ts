import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./isAuthenticated";

export async function middleware(request: NextRequest) {
  const auth = await isAuthenticated(request);
  const pathname = request.nextUrl.pathname;
  if (auth) {
    if (request.nextUrl.pathname === "/logout") {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.set("access_token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
        path: "/",
      });

      response.cookies.set("refresh_token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
      });
      return response;
    }
    request.headers.set(
      "Authorization",
      `Bearer ${request.cookies.get("access_token")?.value}`
    );
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
    "/logout",
  ],
};
