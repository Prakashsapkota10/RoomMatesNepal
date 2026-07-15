"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FiltersSidebarProps {
  activeTab: "rooms" | "roommates";
}

/**
 * Filters sidebar — changes content based on active tab.
 * Rooms: budget slider, room type, amenities, gender preference
 * Roommates: age range, occupation, lifestyle & habits
 * TODO: Wire filter state to actual search/API queries.
 */
export function FiltersSidebar({ activeTab }: FiltersSidebarProps) {
  const [budgetValue, setBudgetValue] = useState(15000);
  const [ageValue, setAgeValue] = useState(25);
  const [selectedRoomType, setSelectedRoomType] = useState("Single Room");
  const [selectedOccupation, setSelectedOccupation] = useState("Student");

  if (activeTab === "rooms") {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-foreground">Filters</h3>
            <Button variant="ghost" size="xs" className="text-xs text-primary font-medium h-auto p-0">
              Reset All
            </Button>
          </div>

          {/* Budget slider */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-foreground mb-2">Budget (per month)</p>
            <input
              type="range"
              min={3000}
              max={50000}
              step={1000}
              value={budgetValue}
              onChange={(e) => setBudgetValue(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
              <span>Rs. 3k</span>
              <span className="px-2 py-0.5 rounded border text-xs font-bold text-foreground">
                Rs. {budgetValue.toLocaleString()}
              </span>
              <span>Rs. 50k+</span>
            </div>
          </div>

          {/* Room Type */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-foreground mb-2">Room Type</p>
            <div className="grid grid-cols-2 gap-2">
              {["Single Room", "Shared Room", "Studio", "Apartment"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedRoomType(type)}
                  className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                    selectedRoomType === type
                      ? "bg-foreground text-background border-foreground font-semibold"
                      : "bg-card text-muted-foreground border-border hover:border-foreground"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-foreground mb-2">Amenities</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "High-speed Internet", checked: true },
                { label: "24/7 Water Supply", checked: false },
                { label: "Dedicated Parking", checked: true },
                { label: "Kitchen Access", checked: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    className="h-3.5 w-3.5 rounded border-border accent-primary"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>

          {/* Gender Preference */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Gender Preference</p>
            <select className="w-full h-9 rounded-lg border border-border bg-card px-3 text-xs text-foreground">
              <option>No Preference</option>
              <option>Male Only</option>
              <option>Female Only</option>
            </select>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Roommates filters
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-foreground">Filters</h3>
          <Button variant="ghost" size="xs" className="text-xs text-primary font-medium h-auto p-0">
            Reset All
          </Button>
        </div>

        {/* Age Range */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-foreground mb-2">Age Range</p>
          <input
            type="range"
            min={18}
            max={40}
            step={1}
            value={ageValue}
            onChange={(e) => setAgeValue(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
            <span>18</span>
            <span className="px-2 py-0.5 rounded border text-xs font-bold text-foreground">
              Up to {ageValue}
            </span>
            <span>40+</span>
          </div>
        </div>

        {/* Occupation */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-foreground mb-2">Occupation</p>
          <div className="grid grid-cols-2 gap-2">
            {["Student", "Professional", "Freelancer", "Other"].map((occ) => (
              <button
                key={occ}
                onClick={() => setSelectedOccupation(occ)}
                className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                  selectedOccupation === occ
                    ? "bg-foreground text-background border-foreground font-semibold"
                    : "bg-card text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Lifestyle & Habits */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Lifestyle & Habits</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Non-smoker", checked: true },
              { label: "Vegetarian", checked: false },
              { label: "Early Bird", checked: true },
              { label: "Pet Friendly", checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="h-3.5 w-3.5 rounded border-border accent-primary"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
