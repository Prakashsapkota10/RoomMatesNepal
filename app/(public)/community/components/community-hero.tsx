"use client";

import { PlusCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";

interface CommunityHeroProps {
  onSearch: (query: string) => void;
  searchValue: string;
}

export function CommunityHero({ onSearch, searchValue }: CommunityHeroProps) {
  return (
    <section className="bg-gradient-to-br from-background via-muted/20 to-background pt-24 pb-8 lg:pt-28 lg:pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Community Hub
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            Connect with fellow urban dwellers in Nepal. Find roommates, discover hidden gems, and share your living experiences.
          </p>

          {/* Search Bar */}
          <SearchBar value={searchValue} onChange={onSearch} />

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <Button className="gap-2 rounded-full px-6 font-semibold">
              <PlusCircle className="h-4 w-4" />
              Ask Question
            </Button>
            <Button variant="outline" className="gap-2 rounded-full px-6 font-semibold">
              <Share2 className="h-4 w-4" />
              Share Experience
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
