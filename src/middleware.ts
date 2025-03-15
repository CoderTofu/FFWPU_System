import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./isAuthenticated";

export async function middleware(request: NextRequest) {
  const auth = await isAuthenticated(request);
  const pathname = request.nextUrl.pathname;
  if (auth) {
    if (pathname.startsWith("/login"))
      return NextResponse.redirect(new URL("/member", request.url));
    request.headers.set(
      "Authorization",
      `Bearer ${request.cookies.get("access_token")?.value}`
    );
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
  ],
};
