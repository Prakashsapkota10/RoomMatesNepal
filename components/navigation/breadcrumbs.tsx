"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types";

/** Route-segment → human-readable label map */
const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  profile: "Profile",
  edit: "Edit",
  preferences: "Preferences",
  verification: "Verification",
  reviews: "Reviews",
  subscription: "Subscription",
  listings: "Listings",
  create: "Create",
  "my-listings": "My Listings",
  roommates: "Find Roommates",
  "my-roommate-posts": "My Posts",
  matches: "AI Matches",
  applications: "Applications",
  sent: "Sent",
  received: "Received",
  messages: "Messages",
  "saved-listings": "Saved Listings",
  notifications: "Notifications",
  pricing: "Pricing",
  "payment-history": "Payment History",
  about: "About",
  contact: "Contact",
  help: "Help Center",
  "privacy-policy": "Privacy Policy",
  terms: "Terms & Conditions",
  admin: "Admin",
  users: "Users",
  reports: "Reports",
  verifications: "Verifications",
  payments: "Payments",
  subscriptions: "Subscriptions",
  settings: "Settings",
  login: "Sign In",
  register: "Register",
  "forgot-password": "Forgot Password",
  "reset-password": "Reset Password",
  "verify-email": "Verify Email",
  "403": "Unauthorized",
  "404": "Not Found",
  "500": "Server Error",
};

/** Build breadcrumb items from the current pathname */
function buildBreadcrumbs(pathname: string): BreadcrumbItemType[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: BreadcrumbItemType[] = [{ label: "Home", href: "/" }];

  segments.forEach((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isId = /^[0-9a-f-]{8,}$/i.test(seg) || /^\d+$/.test(seg);
    const label = isId ? "Details" : (SEGMENT_LABELS[seg] ?? capitalize(seg));
    crumbs.push({ label, href });
  });

  return crumbs;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

interface BreadcrumbsProps {
  /** Override auto-generated crumbs with explicit items */
  items?: BreadcrumbItemType[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const crumbs = items ?? buildBreadcrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;

          return (
            <span key={crumb.href ?? i} className="flex items-center gap-1.5">
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  /* BreadcrumbLink uses `render` prop for polymorphism in Base UI */
                  <BreadcrumbLink render={<Link href={crumb.href ?? "/"} />}>
                    {i === 0 ? (
                      <span className="flex items-center gap-1">
                        <Home className="h-3.5 w-3.5" />
                        <span className="sr-only">Home</span>
                      </span>
                    ) : (
                      crumb.label
                    )}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
