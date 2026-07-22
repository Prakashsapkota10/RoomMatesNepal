"use client";

import { useMemo, useState } from "react";
import { Download, RefreshCw, SlidersHorizontal, Plus, MessageSquareWarning } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { CommunityStatsRow } from "./community-stats-row";
import { CommunityPostsTable } from "./community-posts-table";
import { CommunityPagination } from "./community-pagination";
import { PostDetailsDialog } from "./post-details-dialog";
import { ReportedCommentsTable } from "./reported-comments-table";
import { CommentContextDialog } from "./comment-context-dialog";
import { MOCK_COMMUNITY_POSTS, MOCK_REPORTED_COMMENTS } from "./mock-community";
import type { CommunityPostRow, PostCategory, AdminCommentRow } from "./types";

const PAGE_SIZE = 3;

const TABS: { value: PostCategory; label: string }[] = [
  { value: "question", label: "Questions" },
  { value: "discussion", label: "Discussions" },
  { value: "tip", label: "Tips" },
  { value: "safety_alert", label: "Safety Alerts" },
];

const COMMENTS_TAB_VALUE = "comments" as const;

/**
 * Client shell for /admin/community — stats row, search, category tabs,
 * recent activity table, pagination, and the post details dialog.
 * All filtering/pagination below is client-side over mock data.
 * TODO: replace with server-driven search + filtered/paginated queries.
 */
export function CommunityClient() {
  const [tab, setTab] = useState<PostCategory | typeof COMMENTS_TAB_VALUE>("question");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<CommunityPostRow | null>(null);
  const [selectedComment, setSelectedComment] = useState<AdminCommentRow | null>(null);

  const postsByCategory = useMemo(() => {
    const map = {} as Record<PostCategory, CommunityPostRow[]>;
    for (const t of TABS) {
      map[t.value] = MOCK_COMMUNITY_POSTS.filter((p) => p.category === t.value);
    }
    return map;
  }, []);

  const pendingComments = useMemo(
    () => MOCK_REPORTED_COMMENTS.filter((c) => c.status === "pending"),
    []
  );
  const totalCommentPages = Math.max(1, Math.ceil(MOCK_REPORTED_COMMENTS.length / PAGE_SIZE));
  const pagedComments = MOCK_REPORTED_COMMENTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const isCommentsTab = tab === COMMENTS_TAB_VALUE;
  const activePosts = isCommentsTab ? [] : postsByCategory[tab];
  const totalPages = isCommentsTab
    ? totalCommentPages
    : Math.max(1, Math.ceil(activePosts.length / PAGE_SIZE));

  // A safety alert is pending review whenever it's been flagged by a report.
  const hasPendingSafetyAlerts = postsByCategory.safety_alert.some((p) => p.status === "flagged");

  function handleTabChange(next: string) {
    setTab(next as PostCategory | typeof COMMENTS_TAB_VALUE);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Community Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage questions, discussions, tips, and safety alerts.
          </p>
        </div>
        <Button size="sm" className="btn-primary-motion gap-1.5 font-semibold shrink-0">
          <Plus className="h-3.5 w-3.5" />
          Post Announcement
        </Button>
      </div>

      {/* Search */}
      <AdminSearchBar placeholder="Search discussions, users, or alerts..." />

      {/* Stats summary */}
      <CommunityStatsRow />

      <Tabs value={tab} onValueChange={handleTabChange}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="gap-1.5">
                {t.label}
                {t.value === "safety_alert" && hasPendingSafetyAlerts && (
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                )}
              </TabsTrigger>
            ))}
            <TabsTrigger value={COMMENTS_TAB_VALUE} className="gap-1.5">
              <MessageSquareWarning className="h-3.5 w-3.5" />
              Reported Comments
              {pendingComments.length > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                  {pendingComments.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </Button>
        </div>

        {TABS.map((t) => {
          const tabPosts = postsByCategory[t.value];
          const tabPaged =
            t.value === tab
              ? tabPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              : tabPosts.slice(0, PAGE_SIZE);

          return (
            <TabsContent key={t.value} value={t.value} className="mt-4">
              <Card className="overflow-hidden py-0">
                <CardContent className="p-4 pb-0 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="icon-sm" className="btn-secondary-motion" aria-label="Export">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="icon-sm" className="btn-secondary-motion" aria-label="Refresh">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
                <CardContent className="p-0 mt-3">
                  <CommunityPostsTable posts={tabPaged} onView={setSelectedPost} />
                </CardContent>
                <CommunityPagination
                  page={page}
                  totalPages={totalPages}
                  totalResults={tabPosts.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                />
              </Card>
            </TabsContent>
          );
        })}

        {/* Reported Comments — flagged comments awaiting moderation, with full thread context */}
        <TabsContent value={COMMENTS_TAB_VALUE} className="mt-4">
          <Card className="overflow-hidden py-0">
            <CardContent className="p-4 pb-0 flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Reported Comments</h3>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="icon-sm" className="btn-secondary-motion" aria-label="Export">
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="icon-sm" className="btn-secondary-motion" aria-label="Refresh">
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
            <CardContent className="p-0 mt-3">
              <ReportedCommentsTable comments={pagedComments} onView={setSelectedComment} />
            </CardContent>
            <CommunityPagination
              page={page}
              totalPages={totalCommentPages}
              totalResults={MOCK_REPORTED_COMMENTS.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </Card>
        </TabsContent>
      </Tabs>

      <PostDetailsDialog post={selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)} />
      <CommentContextDialog comment={selectedComment} onOpenChange={(open) => !open && setSelectedComment(null)} />
    </div>
  );
}
