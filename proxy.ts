import { NextResponse } from "next/server";
import { auth } from "./auth";
import { getRoleHome, type Role } from "@/lib/auth-redirect";

const PUBLIC_PATHS = ["/", "/about"];
const AUTH_PATHS = ["/login", "/register"];
const ADMIN_PREFIXES = ["/admin"];

function isPublic(path: string): boolean {
  return PUBLIC_PATHS.some((p) => path === p) || path.startsWith("/api");
}

function isAuthRoute(path: string): boolean {
  return AUTH_PATHS.some((p) => path === p);
}

function isAdminRoute(path: string): boolean {
  return ADMIN_PREFIXES.some((p) => path.startsWith(p));
}

export default auth(function middleware(req) {
  const session = (req as any).auth;
  const path = req.nextUrl.pathname;
  const role = session?.user?.role as Role | undefined;

  if (session && isAuthRoute(path)) {
    const destination = getRoleHome(role);
    return NextResponse.redirect(new URL(destination, req.nextUrl.origin));
  }

  if (isAuthRoute(path)) return NextResponse.next();

  if (isPublic(path)) return NextResponse.next();

  if (!session) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute(path) && role !== "admin") {
    const destination = getRoleHome(role);
    return NextResponse.redirect(new URL(destination, req.nextUrl.origin));
  }

  if (!isAdminRoute(path) && role === "admin") {
    const destination = getRoleHome(role);
    return NextResponse.redirect(new URL(destination, req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
