import "server-only";
import { cookies } from "next/headers";
import type { Session, UserRole } from "@/types";

/**
 * Decrypt / verify session from cookie.
 * Replace with your real JWT/jose implementation.
 */
export async function decrypt(token: string): Promise<Session | null> {
  try {
    // TODO: Replace with real jose/JWT verification
    // import { jwtVerify } from "jose"
    // const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] })
    // return payload as Session
    void token;
    return null;
  } catch {
    return null;
  }
}

/** Read and verify the session cookie. Returns null when unauthenticated. */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  return decrypt(token);
}

/** Verify session and redirect to /login if not authenticated. */
export async function verifySession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
    // redirect() throws, so TypeScript needs a hint
  }
  return session as Session;
}

/** Verify session and check role. Redirects to /403 if insufficient. */
export async function verifyRole(
  ...allowedRoles: UserRole[]
): Promise<Session> {
  const session = await verifySession();
  if (!allowedRoles.includes(session.role)) {
    const { redirect } = await import("next/navigation");
    redirect("/403");
  }
  return session;
}

export async function createSession(
  userId: string,
  role: UserRole,
  isVerified: boolean
): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  // TODO: replace with real jose encrypt
  const token = Buffer.from(
    JSON.stringify({ userId, role, isVerified, expiresAt })
  ).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
