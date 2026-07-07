import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Create Account",
  description: "Create your free RoomMate Nepal account and start finding compatible roommates.",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Start finding compatible roommates today — free forever
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form action="#" className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Ram"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Shrestha"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone Number (Nepal)</Label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-lg border bg-muted px-3 text-sm text-muted-foreground shrink-0">
                  +977
                </span>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
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
                At least 8 characters with a number and special character.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
              />
            </div>

            {/* Role selection */}
            <div className="flex flex-col gap-2">
              <Label>I am joining as</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "user", label: "Renter / Roommate Seeker", desc: "Looking for a room or roommate" },
                  { value: "tenant", label: "Property Owner / Tenant", desc: "Listing rooms to rent out" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={opt.value}
                      defaultChecked={opt.value === "user"}
                      className="sr-only"
                    />
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms agreement */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 rounded border" />
              <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                {" "}and{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <Button type="submit" className="w-full gap-2 mt-2">
              <UserPlus className="h-4 w-4" />
              Create Account
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button variant="outline" className="w-full gap-2" type="button">
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
            </svg>
            Continue with Google
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
