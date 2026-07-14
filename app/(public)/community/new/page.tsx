"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useCategories } from "../hooks";

/**
 * New Discussion page — allows users to post a new community discussion.
 * TODO: Replace mock submission with real API call to backend.
 */
export default function NewDiscussionPage() {
  const router = useRouter();
  const { data: categories } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    // TODO: Replace with real API call
    // await communityService.createDiscussion({ title, category, content });
    console.log("New discussion:", { title, category, content });

    // Simulate delay then redirect back
    await new Promise((r) => setTimeout(r, 500));
    setIsSubmitting(false);
    router.push("/community");
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 max-w-2xl page-enter">
      {/* Back link */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Community
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-6">Start a Discussion</h1>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title" className="text-sm font-medium">
                Discussion Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="What's on your mind?"
                required
                className="h-10"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <select
                id="category"
                name="category"
                required
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="content" className="text-sm font-medium">
                Content
              </Label>
              <textarea
                id="content"
                name="content"
                placeholder="Share your thoughts, ask a question, or start a conversation..."
                required
                rows={6}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/community">
                <Button type="button" variant="outline" className="btn-secondary-motion">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="btn-primary-motion font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post Discussion"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
