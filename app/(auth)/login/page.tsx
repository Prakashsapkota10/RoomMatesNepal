"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useActionState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { staggerContainer, fadeUpItem, slideInLeft, slideInRight } from "@/lib/motion";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center page-enter"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* ── Left column: image + tagline ──────────────────────────────── */}
      <motion.div className="hidden lg:flex flex-col items-center gap-6 text-center" variants={slideInLeft}>
        {/* Floating card / room image */}
        <div className="img-hover relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl card-float-enter">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
            alt="Modern apartment with mountain view in Kathmandu"
            width={540}
            height={380}
            className="object-cover w-full h-72"
            priority
          />
          {/* Small overlay card */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-xl p-3 shadow-lg flex items-center gap-2.5 text-xs font-medium">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
              P
            </div>
            <div className="leading-tight text-left">
              <p className="font-semibold text-foreground text-xs">RoomMate Nepal</p>
              <p className="text-muted-foreground text-[10px]">Welcome back</p>
            </div>
          </div>
        </div>

        <motion.div className="flex flex-col gap-2" variants={fadeUpItem}>
          <h2 className="text-2xl font-bold text-primary leading-snug">
            Secure Housing for Urban<br />Professionals.
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Join a community of 5,000+ verified roommates across Kathmandu, Lalitpur, and Bhaktapur.
          </p>
        </motion.div>
      </motion.div>

      {/* ── Right column: login card ───────────────────────────────────── */}
      <motion.div className="w-full bg-card rounded-2xl shadow-lg border border-border p-8 flex flex-col gap-6" variants={slideInRight}>
        {/* Header */}
        <motion.div className="text-center flex flex-col gap-1" variants={fadeUpItem}>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your verified account to continue.
          </p>
        </motion.div>

        {/* Error message */}
        {state?.error && (
          <motion.div
            className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-3 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {state.error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form action={formAction} className="flex flex-col gap-4" variants={staggerContainer} initial="hidden" animate="visible">
          {/* Email / Phone */}
          <motion.div className="flex flex-col gap-1.5" variants={fadeUpItem}>
            <Label htmlFor="identifier" className="text-xs font-medium text-muted-foreground">
              Email or Phone Number
            </Label>
            <div className="input-container relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="e.g. 9841234567"
                autoComplete="username"
                required
                className="pl-9"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div className="flex flex-col gap-1.5" variants={fadeUpItem}>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="input-container relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="pl-9 pr-10"
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

          {/* Submit */}
          <motion.div variants={fadeUpItem}>
            <Button type="submit" className="btn-primary-motion w-full gap-2 rounded-lg font-semibold mt-1" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In →"}
            </Button>
          </motion.div>
        </motion.form>

        {/* Divider */}
        <motion.div className="flex items-center gap-3" variants={fadeUpItem}>
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            or continue with
          </span>
          <Separator className="flex-1" />
        </motion.div>

        {/* OAuth buttons */}
        <motion.div className="grid grid-cols-2 gap-3" variants={fadeUpItem}>
          <Button variant="outline" className="btn-secondary-motion gap-2 rounded-lg font-medium" type="button">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="btn-secondary-motion gap-2 rounded-lg font-medium" type="button">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2" />
            </svg>
            Facebook
          </Button>
        </motion.div>

        {/* Sign up link */}
        <motion.p className="text-center text-sm text-muted-foreground" variants={fadeUpItem}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline underline-offset-4">
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
