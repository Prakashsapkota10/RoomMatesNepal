import type { Metadata } from "next";
import { buildMeta } from "@/lib/metadata";
import { SettingsClient } from "./components/settings-client";

export const metadata: Metadata = buildMeta({
  title: "Settings",
  noIndex: true,
});

export default function SettingsPage() {
  return <SettingsClient />;
}
