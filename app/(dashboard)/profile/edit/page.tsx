import type { Metadata } from "next";
import { Camera } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";
import { NEPAL_CITIES } from "@/lib/constants";

export const metadata: Metadata = buildMeta({ title: "Edit Profile", noIndex: true });

export default async function EditProfilePage() {
  await verifySession();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Keep your profile up to date to get better matches.
        </p>
      </div>

      <form action="#" className="flex flex-col gap-6">
        {/* Avatar upload */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Profile Photo</CardTitle>
            <CardDescription>A clear photo helps build trust with other users.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-xl font-bold">R</AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                  aria-label="Change photo"
                >
                  <Camera className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <Button type="button" variant="outline" size="sm">
                  Upload New Photo
                </Button>
                <p className="text-xs text-muted-foreground">JPG or PNG, max 2MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" defaultValue="Ram" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" defaultValue="Shrestha" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell potential roommates a bit about yourself..."
                className="min-h-24 resize-none"
                defaultValue="Software engineer by day, book reader by night."
              />
              <p className="text-xs text-muted-foreground">Max 300 characters</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location">Current City</Label>
              <select
                id="location"
                name="location"
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                defaultValue="Kathmandu"
              >
                {NEPAL_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" name="occupation" placeholder="e.g. Software Engineer" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" min={18} max={80} placeholder="25" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue="ram@example.com"
                disabled
                aria-describedby="email-hint"
              />
              <p id="email-hint" className="text-xs text-muted-foreground">
                Email cannot be changed here. Contact support to update it.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-lg border bg-muted px-3 text-sm text-muted-foreground shrink-0">
                  +977
                </span>
                <Input id="phone" name="phone" type="tel" placeholder="98XXXXXXXX" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </div>
      </form>
    </div>
  );
}
