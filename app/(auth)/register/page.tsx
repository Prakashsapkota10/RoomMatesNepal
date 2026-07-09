"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUpItem, slideInLeft, slideInRight } from "@/lib/motion";

type Role = "seeker" | "sharer";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("seeker");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center page-enter"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* ── Left column: image + tagline ──────────────────────────────── */}
      <motion.div className="hidden lg:flex flex-col items-center gap-6 text-center" variants={slideInLeft}>
        <div className="img-hover relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl card-float-enter">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
            alt="People sharing a living space in Nepal"
            width={540}
            height={380}
            className="object-cover w-full h-72"
            priority
          />
          {/* Small overlay badge */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-xl p-3 shadow-lg flex items-center gap-2.5 text-xs font-medium">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
              R
            </div>
            <div className="leading-tight text-left">
              <p className="font-semibold text-foreground text-xs">RoomMate Nepal</p>
              <p className="text-muted-foreground text-[10px]">Join the community</p>
            </div>
          </div>
        </div>

        <motion.div className="flex flex-col gap-2" variants={fadeUpItem}>
          <h2 className="text-2xl font-bold text-primary leading-snug">
            Verified Connections<br />in Nepal.
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Join over 10,000 students and professionals finding safe, reliable living spaces in Kathmandu, Pokhara, and beyond.
          </p>
        </motion.div>
      </motion.div>

      {/* ── Right column: signup card ──────────────────────────────────── */}
      <motion.div className="w-full bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col gap-5" variants={slideInRight}>
        {/* Header */}
        <motion.div className="text-center flex flex-col gap-1" variants={fadeUpItem}>
          <h1 className="text-2xl font-bold text-foreground">Join the Community</h1>
          <p className="text-sm text-muted-foreground">
            Start your journey with Nepal&apos;s most trusted roommate platform.
          </p>
        </motion.div>

        {/* Role toggle */}
        <motion.div className="grid grid-cols-2 rounded-xl border border-border overflow-hidden text-sm font-medium" variants={fadeUpItem}>
          <button
            type="button"
            onClick={() => setRole("seeker")}
            className={cn(
              "py-2.5 px-3 transition-colors",
              role === "seeker"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            I am looking for a room
          </button>
          <button
            type="button"
            onClick={() => setRole("sharer")}
            className={cn(
              "py-2.5 px-3 transition-colors",
              role === "sharer"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            I have a room to share
          </button>
        </motion.div>

        {/* Google sign up */}
        <motion.div variants={fadeUpItem}>
          <Button variant="outline" className="btn-secondary-motion w-full gap-2.5 rounded-lg font-medium" type="button">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div className="flex items-center gap-3" variants={fadeUpItem}>
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">or email</span>
          <Separator className="flex-1" />
        </motion.div>

        {/* Form */}
        <motion.form action="#" className="flex flex-col gap-3.5" variants={staggerContainer} initial="hidden" animate="visible">
          {/* Full Name */}
          <motion.div className="flex flex-col gap-1.5" variants={fadeUpItem}>
            <Label htmlFor="fullName" className="text-xs font-medium text-muted-foreground">
              Full Name
            </Label>
            <div className="input-container">
              <Input id="fullName" name="fullName" type="text" placeholder=" Ram Sharma" autoComplete="name" required />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div className="flex flex-col gap-1.5" variants={fadeUpItem}>
            <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              Email Address
            </Label>
            <div className="input-container">
              <Input id="email" name="email" type="email" placeholder="ram@example.com" autoComplete="email" required />
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div className="flex flex-col gap-1.5" variants={fadeUpItem}>
            <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
              Phone Number
            </Label>
            <div className="input-container flex gap-0">
              <span className="flex items-center rounded-l-lg border border-r-0 border-border bg-muted px-3 text-sm text-muted-foreground shrink-0">
                +977
              </span>
              <Input id="phone" name="phone" type="tel" placeholder="98XXXXXXXX" autoComplete="tel" required className="rounded-l-none" />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div className="flex flex-col gap-1.5" variants={fadeUpItem}>
            <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
              Password
            </Label>
            <div className="input-container relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                required
                minLength={8}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>

          {/* Confirm Password */}
          <motion.div className="flex flex-col gap-1.5" variants={fadeUpItem}>
            <Label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">
              Confirm Password
            </Label>
            <div className="input-container">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
          </motion.div>

          {/* Terms */}
          <motion.label className="flex items-start gap-2.5 cursor-pointer mt-0.5" variants={fadeUpItem}>
            <input
              type="checkbox"
              name="agreeTerms"
              required
              className="mt-0.5 h-4 w-4 rounded border border-border shrink-0 accent-primary"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline underline-offset-2">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>.
            </span>
          </motion.label>

          {/* Submit */}
          <motion.div variants={fadeUpItem}>
            <Button type="submit" className="btn-primary-motion w-full rounded-lg font-semibold mt-1">
              Create Account
            </Button>
          </motion.div>
        </motion.form>

        {/* Login link */}
        <motion.p className="text-center text-sm text-muted-foreground" variants={fadeUpItem}>
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline underline-offset-4">
            Login
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
