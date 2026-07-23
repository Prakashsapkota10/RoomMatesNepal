import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { verifyRole } from "@/lib/auth";
import { VerificationsClient } from "./components/verifications-client";

export const metadata: Metadata = buildMeta({
  title: "Trust & Verification",
  noIndex: true,
});

export default async function AdminVerificationsPage() {
  // Route already gated by app/(admin)/layout.tsx — verifyRole is a defense-in-depth
  // check at the page level in case this page is ever reached via a different layout.
  await verifyRole("admin");

  return <VerificationsClient />;
}
