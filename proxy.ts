import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Route classification ─────────────────────────────────────────────────────

/** Routes that require *any* authenticated session */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/my-listings",
  "/listings/create",
  "/roommates/create",
  "/my-roommate-posts",
  "/matches",
  "/applications",
  "/messages",
  "/saved-listings",
  "/notifications",
  "/subscription",
  "/payment-history",
];

/** Routes that require the admin role */
const ADMIN_PREFIXES = ["/admin"];

/** Routes that should redirect *authenticated* users away (e.g., /login) */
const AUTH_ONLY_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

// ─── Session helper ───────────────────────────────────────────────────────────

interface TokenPayload {
  userId: string;
  role: "user" | "tenant" | "admin";
  isVerified: boolean;
  expiresAt: string;
}

/**
 * Optimistic token decode — reads the session cookie and base64-decodes it.
 * This is intentionally lightweight; full cryptographic verification happens
 * in the DAL / Server Actions, not in the proxy.
 */
function parseSessionCookie(request: NextRequest): TokenPayload | null {
  const raw = request.cookies.get("session")?.value;
  if (!raw) return null;
  try {
    const json = Buffer.from(raw, "base64").toString("utf-8");
    const payload = JSON.parse(json) as TokenPayload;
    if (!payload.userId || !payload.role) return null;
    if (new Date(payload.expiresAt) < new Date()) return null;
    return payload;
  } catch {
    return null;
  }
}

// ─── Proxy function ───────────────────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSessionCookie(request);

  // 1. Admin routes — must be authenticated AND admin
  if (ADMIN_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protected routes — must be authenticated
  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 3. Auth-only routes — redirect authenticated users to dashboard
  if (AUTH_ONLY_ROUTES.some((p) => pathname.startsWith(p))) {
    if (session) {
      const dest = session.role === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(dest, request.url));
    }
    return NextResponse.next();
  }

  // 4. All other routes — public, allow through
  return NextResponse.next();
}

// ─── Matcher — skip static assets & API routes ───────────────────────────────

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|gif|ico|webp|woff2?|ttf)$).*)",
  ],
};
