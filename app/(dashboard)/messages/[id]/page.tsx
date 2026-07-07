import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Conversation",
  noIndex: true,
});

export default function ConversationPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Conversation</h1>
      <p className="text-muted-foreground">Thread ID: {params.id}</p>
    </div>
  );
}
