import Link from "next/link";
import { Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

/**
 * AuthLayout — centred card layout for login, register, etc.
 * No sidebar or header nav — clean focus on the auth form.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Minimal header */}
      <header className="flex h-14 items-center px-6 border-b bg-background">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          {APP_NAME}
        </Link>
      </header>

      {/* Centered form area */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t bg-background py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {APP_NAME} &mdash;{" "}
        <Link href="/privacy-policy" className="underline-offset-2 hover:underline">
          Privacy
        </Link>{" "}
        &middot;{" "}
        <Link href="/terms" className="underline-offset-2 hover:underline">
          Terms
        </Link>
      </footer>
    </div>
  );
}
