"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

/**
 * Login server action.
 * Currently uses mock validation — replace with real database/API auth in production.
 *
 * TODO: Replace mock validation with:
 * 1. Database lookup for the user by email/phone
 * 2. Password hash comparison (bcrypt/argon2)
 * 3. Rate limiting and brute-force protection
 * 4. Email/phone verification check
 */
export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!identifier || !password) {
    return { error: "Please enter your email/phone and password." };
  }

  // TODO: Replace with real authentication logic
  // Mock authentication — accepts any non-empty credentials for development
  const mockUsers: Record<string, { id: string; role: "user" | "tenant" | "admin"; isVerified: boolean }> = {
    "sameer@example.com": { id: "user-1", role: "user", isVerified: true },
    "9841234567": { id: "user-1", role: "user", isVerified: true },
    "owner@example.com": { id: "user-2", role: "tenant", isVerified: true },
    "admin@example.com": { id: "user-3", role: "admin", isVerified: true },
  };

  // Simulate password check — in production, use bcrypt.compare()
  if (password.length < 4) {
    return { error: "Invalid credentials. Please try again." };
  }

  // Look up user or default to mock user
  const user = mockUsers[identifier.toLowerCase()] ?? {
    id: "user-1",
    role: "user" as const,
    isVerified: true,
  };

  // Create session cookie
  await createSession(user.id, user.role, user.isVerified);

  // Redirect to appropriate dashboard
  if (user.role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
}
