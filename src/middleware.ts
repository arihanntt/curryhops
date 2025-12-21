import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect BOTH /admin and /admin/*
  const isAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const auth = req.cookies.get("admin-auth")?.value;

  if (auth === "true") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/admin-login", req.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
