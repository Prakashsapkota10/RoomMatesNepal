import type { Metadata } from "next";
import { CommunityQueryProvider } from "./components/query-provider";
import { CommunityContent } from "./components/community-content";

export const metadata: Metadata = {
  title: "Community Hub",
  description:
    "Connect with fellow urban dwellers in Nepal. Find roommates, discover hidden gems, and share your living experiences.",
};

export default function CommunityPage() {
  return (
    <CommunityQueryProvider>
      <CommunityContent />
    </CommunityQueryProvider>
  );
}
