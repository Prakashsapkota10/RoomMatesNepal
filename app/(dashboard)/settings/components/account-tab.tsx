"use client";

import { useState } from "react";
import { Camera, CheckCircle, Mail, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AccountTab() {
  const [profileCompletion] = useState(85);

  return (
    <div className="flex flex-col gap-6">
      {/* Header with action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your personal information and profile details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="btn-secondary-motion">
            Reset
          </Button>
          <Button className="btn-primary-motion font-semibold">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Left column — Form */}
        <div className="flex flex-col gap-5">
          {/* Profile Picture */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/images/avatar-female.jpg" alt="Profile" />
                    <AvatarFallback className="text-xl font-bold">JD</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-110"
                    aria-label="Change photo"
                  >
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Profile Picture</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    JPG, GIF or PNG. Max size of 800K.
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <Button variant="outline" size="sm" className="text-xs">
                      Upload Photo
                    </Button>
                    <button
                      type="button"
                      className="text-xs font-medium text-destructive hover:underline"
                    >
                      Remove Photo
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-foreground">Personal Info</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fullName" className="text-xs text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    defaultValue="Jenish Dongol"
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs text-muted-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="jenish.dongol@example.com"
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+977 9841000000"
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="occupation" className="text-xs text-muted-foreground">
                    Occupation
                  </Label>
                  <Input
                    id="occupation"
                    defaultValue="Software Engineer"
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dob" className="text-xs text-muted-foreground">
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    defaultValue="1995-05-15"
                    className="h-9"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="gender" className="text-xs text-muted-foreground">
                    Gender
                  </Label>
                  <select
                    id="gender"
                    defaultValue="male"
                    className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-1.5 mt-4">
                <Label htmlFor="bio" className="text-xs text-muted-foreground">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  defaultValue="Looking for a peaceful living space in Kathmandu. Clean, quiet, and enjoys weekend hikes. Currently working in the tech sector."
                  className="min-h-24 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Info cards */}
        <aside className="flex flex-col gap-4">
          {/* Profile Completion */}
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Profile Completion
              </p>
              {/* Circular progress */}
              <div className="relative h-20 w-20 mb-3">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-muted"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - profileCompletion / 100)}`}
                    className="text-primary transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-success">{profileCompletion}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Your profile is almost complete! Add a rental history to reach 100%.
              </p>
              <Button variant="outline" size="sm" className="mt-3 text-xs w-full">
                Add Rental History
              </Button>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Verification Status</p>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-success">
                  <CheckCircle className="h-3 w-3" />
                  VERIFIED
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground">ID Verified</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground">Email Verified</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Score */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs font-semibold">Trust Score</p>
              </div>
              <p className="text-3xl font-bold">
                94 <span className="text-sm font-normal opacity-80">/ 100</span>
              </p>
              <p className="text-xs opacity-80 mt-1.5">
                Excellent! High scores increase your chances of finding top-tier roommates by 3x.
              </p>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white" style={{ width: "94%" }} />
              </div>
            </CardContent>
          </Card>

          {/* Pro Tip */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <p className="text-xs font-semibold text-primary">Pro Tip</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Adding a detailed bio helps potential roommates understand your lifestyle better.
                Mention your typical wake-up time and noise preferences!
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
