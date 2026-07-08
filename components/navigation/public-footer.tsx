"use client";

import Link from "next/link";
import { Sparkles, Share2, Globe, Mail, Send } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useState } from "react";

export function PublicFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t bg-muted/20">
      {/* ── Main columns ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              {APP_NAME}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              Making house hunting and roommate matching easy, safe, and reliable across Nepal.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {[
                { icon: Share2, label: "Share" },
                { icon: Globe,  label: "Website" },
                { icon: Mail,   label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Find Rooms",      href: "/listings"  },
                { label: "Find Roommates",  href: "/roommates" },
                { label: "AI Match",        href: "/matches"   },
                { label: "Community",       href: "/about"     },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Support</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Safety Guide",     href: "/help"           },
                { label: "Privacy Policy",   href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms"          },
                { label: "Contact Us",       href: "/contact"        },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Subscribe</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Get the latest room updates in your inbox.
            </p>
            <div className="input-container flex items-center gap-0 rounded-xl border bg-background overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Subscribe email"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                aria-label="Subscribe"
                className="btn-primary-motion flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-[color:var(--brand-hover)]"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="border-t">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-1 text-xs text-muted-foreground">
          <span>© 2024 {APP_NAME}.</span>
          <span>Secure, Verified, and Reliable.</span>
        </div>
      </div>
    </footer>
  );
}
