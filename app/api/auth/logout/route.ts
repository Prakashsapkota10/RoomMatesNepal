import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * Deletes the session cookie and redirects to the login page.
 * TODO: In production, also invalidate the session in your database/cache.
 */
export async function POST() {
  await deleteSession();
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
}
