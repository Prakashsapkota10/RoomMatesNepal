import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Notifications",
  noIndex: true,
});

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Notifications</h1>
      <p className="text-muted-foreground">Your notifications will appear here.</p>
    </div>
  );
}
