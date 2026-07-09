import type { Metadata } from "next";
import Link from "next/link";
import {
  Pencil,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";
import { getTrustColor, getTrustLabel } from "@/lib/utils";

export const metadata: Metadata = buildMeta({ title: "My Profile", noIndex: true });

export default async function ProfilePage() {
  await verifySession();

  // TODO: replace with real user fetch
  const user = {
    name: "Ram Shrestha",
    email: "ram@example.com",
    phone: "+977 9801234567",
    avatar: null as string | null,
    bio: "Software engineer by day, book reader by night. Looking for a quiet, clean flatmate in Kathmandu. Non-smoker, no pets.",
    location: "Kathmandu",
    joinedAt: "2024-03-15",
    isEmailVerified: true,
    isPhoneVerified: false,
    isIdVerified: false,
    trustScore: 72,
    role: "tenant" as const,
    totalReviews: 6,
    avgRating: 4.5,
    activeListings: 2,
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl page-enter">
      {/* Profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar ?? undefined} />
                <AvatarFallback className="text-xl font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {user.isIdVerified && (
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold">{user.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="secondary" className="capitalize text-xs">
                      {user.role}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {user.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Joined {new Date(user.joinedAt).toLocaleDateString("en-NP", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                </div>
                <Link href="/profile/edit">
                  <Button variant="outline" size="sm" className="btn-secondary-motion gap-2 shrink-0">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit Profile
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{user.bio}</p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {user.email}
                  {user.isEmailVerified && (
                    <Badge variant="secondary" className="text-xs py-0">Verified</Badge>
                  )}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {user.phone}
                  {!user.isPhoneVerified && (
                    <Badge variant="outline" className="text-xs py-0 text-orange-500">Unverified</Badge>
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="card-dashboard">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{user.activeListings}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Active Listings</p>
              </CardContent>
            </Card>
            <Card className="card-dashboard">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <p className="text-2xl font-bold">{user.avgRating}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{user.totalReviews} Reviews</p>
              </CardContent>
            </Card>
            <Card className="card-dashboard">
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-bold ${getTrustColor(user.trustScore)}`}>
                  {user.trustScore}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {getTrustLabel(user.trustScore)} Trust
                </p>
              </CardContent>
            </Card>
      </div>

      {/* Trust score details */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Trust Score Breakdown
            </CardTitle>
            <Link href="/profile/verification">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Verify ID <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex flex-col gap-3">
          {[
            { label: "Email Verified", points: 20, done: user.isEmailVerified },
            { label: "Profile Complete", points: 20, done: true },
            { label: "Phone Verified", points: 15, done: user.isPhoneVerified },
            { label: "ID Document Uploaded", points: 25, done: user.isIdVerified },
            { label: "Received 5+ Reviews", points: 20, done: user.totalReviews >= 5 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                  item.done ? "bg-primary" : "bg-muted border"
                }`}
              >
                {item.done && (
                  <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`flex-1 text-sm ${item.done ? "" : "text-muted-foreground"}`}>
                {item.label}
              </span>
              <Badge variant={item.done ? "default" : "outline"} className="text-xs">
                +{item.points} pts
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Profile links */}
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { label: "Edit Profile", href: "/profile/edit", icon: Pencil, desc: "Update your info and bio" },
          { label: "Lifestyle Preferences", href: "/profile/preferences", icon: Star, desc: "Improve AI match quality" },
          { label: "Verification", href: "/profile/verification", icon: ShieldCheck, desc: "Upload ID documents" },
          { label: "My Reviews", href: "/profile/reviews", icon: Star, desc: "See what others say about you" },
        ].map(({ label, href, icon: Icon, desc }) => (
          <Link key={label} href={href}>
            <Card className="card-listing">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
