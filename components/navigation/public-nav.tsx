"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TopNavProps {
  isAuthenticated?: boolean;
  userAvatar?: string;
  userName?: string;
}

// Extra nav items to match the screenshot (Browse Rooms, Find Roommates, AI Match, Community, Pricing, About)
const EXTENDED_NAV = [
  { label: "Find Rooms", href: "/listings" },
  { label: "Find Roommates", href: "/roommates" },
  { label: "AI Match", href: "/matches" },
  { label: "Community", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function TopNav({
  isAuthenticated = false,
  userAvatar,
  userName,
}: TopNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Hide navbar when scrolling down fast, show when scrolling up (like apple.com)
      if (y > lastScrollY.current + 5 && y > 80) {
        setVisible(false);
      } else if (y < lastScrollY.current - 5 || y < 80) {
        setVisible(true);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        // Base: hide/show on scroll direction — use spec page-transition timing (300ms)
        "fixed top-0 z-50 w-full",
        "transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      {/* Separate backdrop layer so blur/border animate independently at 200ms */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          scrolled
            ? "bg-background/80 dark:bg-background/75 backdrop-blur-xl shadow-[0_1px_0_0_var(--border)]"
            : "bg-transparent backdrop-blur-none shadow-none",
          mobileOpen && "bg-background/95 backdrop-blur-xl"
        )}
        aria-hidden
      />
      <div className="relative z-10 container mx-auto flex h-14 items-center justify-between px-4 lg:px-8">
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg shrink-0 group"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-150 group-hover:scale-110">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span
            className={cn(
              "hidden sm:block transition-all duration-300",
              scrolled ? "opacity-100" : "opacity-100"
            )}
          >
            {APP_NAME}
          </span>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {EXTENDED_NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link relative px-3 py-1.5 text-sm font-medium rounded-md",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {/* Active underline indicator */}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary animate-in fade-in slide-in-from-bottom-1 duration-150" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Actions ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5">
          {/* Search icon */}
          <Button variant="ghost" size="icon" className="hidden lg:flex h-8 w-8" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </Button>

          <ThemeToggle />

          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex gap-2 h-8 px-3 text-sm"
              >
                {userAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userAvatar}
                    alt={userName ?? "User"}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {userName?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                )}
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-sm font-medium"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="h-8 px-4 text-sm font-medium rounded-full"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <Menu
                className={cn(
                  "absolute h-4 w-4 transition-all duration-200",
                  mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                )}
              />
              <X
                className={cn(
                  "absolute h-4 w-4 transition-all duration-200",
                  mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                )}
              />
            </span>
          </Button>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto flex flex-col gap-0.5 px-4 py-4">
            {EXTENDED_NAV.map((item, i) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "animate-in slide-in-from-left-2 fade-in duration-200",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {!isAuthenticated && (
              <div className="mt-4 flex flex-col gap-2 pt-4 border-t">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-full">Register</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
