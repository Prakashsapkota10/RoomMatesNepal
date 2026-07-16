import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { MessagesClient } from "./components/messages-client";

export const metadata: Metadata = buildMeta({
  title: "Messages",
  noIndex: true,
});

export default function MessagesPage() {
  return <MessagesClient />;
}
