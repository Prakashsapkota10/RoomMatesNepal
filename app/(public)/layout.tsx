import { TopNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";
import { getOptionalSession } from "@/lib/dal";

/**
 * PublicLayout — wraps all public-facing marketing pages.
 * Renders TopNav (with optional auth state) and PublicFooter.
 */
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getOptionalSession();

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav isAuthenticated={!!session} />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
