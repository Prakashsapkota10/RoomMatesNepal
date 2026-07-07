import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Platform Settings",
  noIndex: true,
});

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Platform Settings</h1>
      <p className="text-muted-foreground">Configure platform-wide settings.</p>
    </div>
  );
}
