import "server-only";
import { cache } from "react";
import { verifySession, verifyRole } from "@/lib/auth";
import type { Session, UserRole } from "@/types";

/**
 * Data Access Layer (DAL)
 * Centralises auth checks and data-fetching patterns.
 * Every Server Component / Server Action that needs auth should call these.
 */

/** Memoised per-render: validates session and returns it. */
export const getCurrentSession = cache(async (): Promise<Session> => {
  return verifySession();
});

/** Memoised: validates role and returns session. */
export const requireRole = cache(
  async (...roles: UserRole[]): Promise<Session> => {
    return verifyRole(...roles);
  }
);

/** Returns session or null — safe for optional auth on public pages. */
export const getOptionalSession = cache(async (): Promise<Session | null> => {
  const { getSession } = await import("@/lib/auth");
  return getSession();
});
