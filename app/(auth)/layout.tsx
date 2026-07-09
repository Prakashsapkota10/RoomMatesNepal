import { TopNav } from "@/components/navigation/public-nav";
import { PublicFooter } from "@/components/navigation/public-footer";

/**
 * AuthLayout — uses the full public nav + footer so the auth pages
 * match the rest of the site (matches the design screenshot).
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav isAuthenticated={false} />
      <main className="flex flex-1 items-center justify-center px-4 py-12 mt-14 bg-muted/30">
        <div className="w-full max-w-5xl">{children}</div>
      </main>
      <PublicFooter />
    </div>
  );
}
