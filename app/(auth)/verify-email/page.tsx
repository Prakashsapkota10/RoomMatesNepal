import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck, RefreshCw, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Verify Your Email",
  description: "Verify your email address to activate your RoomMate Nepal account.",
  noIndex: true,
});

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string; verified?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { email, verified } = await searchParams;

  // State: already verified
  if (verified === "true") {
    return (
      <Card className="modal-enter">
        <CardContent className="p-8 text-center flex flex-col items-center gap-5">
          <div className="icon-ping flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-xl">Email Verified!</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your email has been verified. Your account is now active.
            </p>
          </div>
          <Link href="/dashboard" className="w-full">
            <Button className="btn-primary-motion w-full">Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // State: waiting for verification
  return (
    <div className="flex flex-col gap-6">
      <Card className="modal-enter">
        <CardContent className="p-8 text-center flex flex-col items-center gap-5">
          <div className="icon-ping flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>

          <div>
            <h2 className="font-bold text-xl">Check your email</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              We sent a verification link to{" "}
              <span className="font-medium text-foreground">
                {email ?? "your email address"}
              </span>
              . Click the link to activate your account.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            {/* Resend action — wire to Server Action */}
            <form action="#">
              {email && <input type="hidden" name="email" value={email} />}
              <Button type="submit" variant="outline" className="btn-secondary-motion w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                Resend Verification Email
              </Button>
            </form>
          </div>

          <p className="text-xs text-muted-foreground">
            Didn&apos;t get it? Check your spam folder or{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact support
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>
    </div>
  );
}
