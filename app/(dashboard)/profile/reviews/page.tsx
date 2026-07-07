import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { verifySession } from "@/lib/auth";
import { buildMeta } from "@/lib/metadata";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = buildMeta({ title: "My Reviews", noIndex: true });

const MOCK_REVIEWS = [
  { id: "1", author: "Sita Thapa", avatar: "S", rating: 5, comment: "Very clean and respectful. Would highly recommend as a roommate!", date: new Date(Date.now() - 7 * 86400_000).toISOString(), type: "received" },
  { id: "2", author: "Anil Gurung", avatar: "A", rating: 4, comment: "Good communication, paid rent on time. Occasionally had guests late.", date: new Date(Date.now() - 30 * 86400_000).toISOString(), type: "received" },
  { id: "3", author: "Priya Rai", avatar: "P", rating: 5, comment: "Perfect flatmate experience. We shared the same schedule and everything was smooth.", date: new Date(Date.now() - 60 * 86400_000).toISOString(), type: "received" },
];

const avgRating = MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length;

export default async function ReviewsPage() {
  await verifySession();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">My Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Reviews from people who have lived with you or hosted you.
        </p>
      </div>

      {/* Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-5 flex items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold">{avgRating.toFixed(1)}</p>
            <div className="flex gap-0.5 mt-1 justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className={`h-3.5 w-3.5 ${n <= Math.round(avgRating) ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">{MOCK_REVIEWS.length} total reviews</p>
            <div className="flex flex-col gap-1 mt-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = MOCK_REVIEWS.filter((r) => r.rating === star).length;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs w-3">{star}</span>
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(count / MOCK_REVIEWS.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review list */}
      <div className="flex flex-col gap-4">
        {MOCK_REVIEWS.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-sm">{review.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{review.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {review.type === "received" ? "Reviewed you" : "You reviewed"}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {timeAgo(review.date)}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`h-3.5 w-3.5 ${n <= review.rating ? "fill-primary text-primary" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
