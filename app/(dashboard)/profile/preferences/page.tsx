import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Lifestyle Preferences",
  noIndex: true,
});

export default async function PreferencesPage() {
  await verifySession();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          Lifestyle Preferences
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          These preferences power your AI compatibility score. The more accurate you are, the better your matches.
        </p>
      </div>

      <form action="#" className="flex flex-col gap-5">
        {/* Sleep schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sleep Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "early-bird", label: "Early Bird", desc: "Before 10PM" },
                { value: "flexible", label: "Flexible", desc: "Varies" },
                { value: "night-owl", label: "Night Owl", desc: "After midnight" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm text-center has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                >
                  <input type="radio" name="sleepSchedule" value={opt.value} className="sr-only" defaultChecked={opt.value === "flexible"} />
                  <span className="font-medium">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">{opt.desc}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cleanliness */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Cleanliness Level</CardTitle>
            <CardDescription>1 = relaxed, 5 = very clean & tidy</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Relaxed</span>
              <span>Very Clean</span>
            </div>
            <Slider defaultValue={[4]} min={1} max={5} step={1} name="cleanliness" className="w-full" />
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="text-xs text-muted-foreground">{n}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Noise & Guest toggles */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">House Rules</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col gap-4">
            {[
              { name: "smokingAllowed", label: "Smoking Allowed", desc: "Do you allow smoking indoors?" },
              { name: "petsAllowed", label: "Pets Welcome", desc: "Are you OK living with pets?" },
              { name: "workFromHome", label: "Work From Home", desc: "Do you work from home regularly?" },
              { name: "studyEnvironment", label: "Quiet Study Environment", desc: "Need a quiet space for studying?" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Label htmlFor={item.name} className="text-sm font-medium cursor-pointer">
                    {item.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch id={item.name} name={item.name} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Guest policy */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Guest Policy</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "no-guests", label: "No Guests", desc: "Prefer private space" },
                { value: "occasional", label: "Occasional", desc: "Now and then" },
                { value: "frequent", label: "Frequent", desc: "Social household" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm text-center has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
                >
                  <input type="radio" name="guestPolicy" value={opt.value} className="sr-only" defaultChecked={opt.value === "occasional"} />
                  <span className="font-medium">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">{opt.desc}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget range */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Budget (NPR)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="budgetMin" className="text-xs">Minimum</Label>
                <input
                  id="budgetMin"
                  name="budgetMin"
                  type="number"
                  defaultValue={5000}
                  className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="budgetMax" className="text-xs">Maximum</Label>
                <input
                  id="budgetMax"
                  name="budgetMax"
                  type="number"
                  defaultValue={15000}
                  className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full sm:w-auto">Save Preferences</Button>
      </form>
    </div>
  );
}
