import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Reset Password",
  description: "Set a new password for your RoomMate Nepal account.",
  noIndex: true,
});

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  // If no token in query, show an error state
  if (!token) {
    return (
      <Card>
        <CardContent className="p-8 text-center flex flex-col gap-4">
          <KeyRound className="h-10 w-10 text-destructive mx-auto" />
          <div>
            <h2 className="font-semibold text-lg">Invalid Reset Link</h2>
            <p className="text-sm text-muted-foreground mt-1">
              This password reset link is invalid or has expired.
            </p>
          </div>
          <Link href="/forgot-password">
            <Button className="w-full">Request a new link</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-2">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Set a new password</CardTitle>
          <CardDescription>
            Choose a strong password that you haven&apos;t used before.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form action="#" className="flex flex-col gap-4">
            {/* Hidden field carries the reset token */}
            <input type="hidden" name="token" value={token} />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with a number and special character.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              Reset Password
            </Button>
          </form>
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
