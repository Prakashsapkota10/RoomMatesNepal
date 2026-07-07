import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Messages",
  noIndex: true,
});

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="text-muted-foreground">Your conversations will appear here.</p>
    </div>
  );
}
