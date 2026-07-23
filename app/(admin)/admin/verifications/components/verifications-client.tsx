"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, ListChecks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { ToastProvider, useToast } from "@/components/admin/toast-provider";
import { VerificationSummaryCards } from "./verification-summary-cards";
import { VerificationOverview } from "./verification-overview";
import { VerificationFiltersBar } from "./verification-filters-bar";
import { VerificationTable } from "./verification-table";
import { VerificationsPagination } from "./verifications-pagination";
import { VerificationDetailDrawer } from "./verification-detail-drawer";
import { AdditionalVerificationDialog } from "./additional-verification-dialog";
import { MarkVerifiedDialog, SuspendAccountDialog, RejectVerificationDialog } from "./confirmation-dialogs";
import { MOCK_VERIFICATIONS } from "./mock-verifications";
import { PAGE_SIZE, VERIFICATION_TABS } from "./constants";
import { matchesFilters, matchesSearch } from "./verification.utils";
import {
  DEFAULT_VERIFICATION_FILTERS,
  type ReviewNote,
  type VerificationFiltersState,
  type VerificationRow,
  type VerificationTab,
} from "./types";

/**
 * Client shell for /admin/verifications — KPI cards, Overview tab, search,
 * filters, the verification requests table, pagination, and the detail
 * drawer with all admin actions and confirmation dialogs. All
 * filtering/pagination below is client-side over mock data.
 * TODO: replace with server-driven search + filtered/paginated verification queries.
 */
function VerificationsClientInner() {
  const { showToast } = useToast();

  const [verifications, setVerifications] = useState<VerificationRow[]>(MOCK_VERIFICATIONS);
  const [tab, setTab] = useState<VerificationTab>("overview");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<VerificationFiltersState>(DEFAULT_VERIFICATION_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedVerification, setSelectedVerification] = useState<VerificationRow | null>(null);

  const [additionalDialogTarget, setAdditionalDialogTarget] = useState<VerificationRow | null>(null);
  const [markVerifiedTarget, setMarkVerifiedTarget] = useState<VerificationRow | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<VerificationRow | null>(null);
  const [rejectTarget, setRejectTarget] = useState<VerificationRow | null>(null);

  // Simulated initial load — mirrors what a real `await fetch(...)` would
  // look like; kept short since this is mock data.
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  function handleRetry() {
    setIsError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }

  const filteredVerifications = useMemo(() => {
    let base = verifications;
    if (tab === "requests") base = base.filter((v) => v.status === "pending" || v.status === "under_review");
    if (tab === "verified") base = base.filter((v) => v.status === "verified");
    if (tab === "trust_reviews") base = base.filter((v) => v.primaryType === "manual_review");
    if (tab === "history") base = base; // full history view — every case, most recent first
    return base
      .filter((v) => matchesFilters(v, filters) && matchesSearch(v, search))
      .sort((a, b) => (tab === "history" ? new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime() : 0));
  }, [verifications, tab, filters, search]);

  const totalPages = Math.max(1, Math.ceil(filteredVerifications.length / PAGE_SIZE));
  const pagedVerifications = filteredVerifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateVerification(id: string, updater: (v: VerificationRow) => VerificationRow) {
    setVerifications((prev) => prev.map((v) => (v.id === id ? updater(v) : v)));
    setSelectedVerification((prev) => (prev && prev.id === id ? updater(prev) : prev));
  }

  function handleTabChange(next: string) {
    setTab(next as VerificationTab);
    setPage(1);
  }

  function handleFiltersChange(next: VerificationFiltersState) {
    setFilters(next);
    setPage(1);
  }

  function handleClearFilters() {
    setFilters(DEFAULT_VERIFICATION_FILTERS);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleExport() {
    showToast(`Exporting ${filteredVerifications.length} verification cases to CSV...`, "info");
  }

  function handleAddNote(verificationId: string, message: string) {
    const note: ReviewNote = {
      id: `note-${Date.now()}`,
      authorName: "Admin",
      message,
      createdAt: new Date().toISOString(),
    };
    updateVerification(verificationId, (v) => ({ ...v, notes: [...v.notes, note] }));
    showToast("Internal note added.", "success");
  }

  function handleMarkVerifiedConfirm() {
    if (!markVerifiedTarget) return;
    const now = new Date().toISOString();
    updateVerification(markVerifiedTarget.id, (v) => ({
      ...v,
      status: "verified",
      channels: { ...v.channels, manualReview: "verified" },
      history: [...v.history, { label: "Marked as verified", timestamp: now, actor: "Admin" }],
    }));
    showToast(`${markVerifiedTarget.userName} marked as verified.`, "success");
  }

  function handleMarkNeedsAttention(v: VerificationRow) {
    const now = new Date().toISOString();
    updateVerification(v.id, (row) => ({
      ...row,
      status: "needs_attention",
      history: [...row.history, { label: "Marked as needs attention", timestamp: now, actor: "Admin" }],
    }));
    showToast(`${v.userName} marked as needs attention.`, "info");
  }

  function handleRequestAdditionalSend(reason: string, message: string) {
    if (!additionalDialogTarget) return;
    const now = new Date().toISOString();
    updateVerification(additionalDialogTarget.id, (v) => ({
      ...v,
      history: [
        ...v.history,
        { label: `Additional verification requested (${reason.replace(/_/g, " ")})`, timestamp: now, actor: "Admin" },
      ],
      notes: message
        ? [...v.notes, { id: `note-${Date.now()}`, authorName: "Admin", message, createdAt: now }]
        : v.notes,
    }));
    showToast(`Verification request sent to ${additionalDialogTarget.userName}.`, "success");
  }

  function handleRejectConfirm(reason: string) {
    if (!rejectTarget) return;
    const now = new Date().toISOString();
    updateVerification(rejectTarget.id, (v) => ({
      ...v,
      status: "rejected",
      channels: { ...v.channels, manualReview: "rejected" },
      history: [...v.history, { label: "Verification rejected", timestamp: now, actor: "Admin" }],
      notes: [...v.notes, { id: `note-${Date.now()}`, authorName: "Admin", message: reason, createdAt: now }],
    }));
    showToast(`${rejectTarget.userName}'s verification was rejected.`, "error");
  }

  function handleSuspendConfirm() {
    if (!suspendTarget) return;
    const now = new Date().toISOString();
    updateVerification(suspendTarget.id, (v) => ({
      ...v,
      status: "suspended",
      channels: { ...v.channels, manualReview: "suspended" },
      history: [...v.history, { label: "Account suspended", timestamp: now, actor: "Admin" }],
    }));
    showToast(`${suspendTarget.userName}'s account was suspended.`, "error");
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Trust & Verification</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review user verification signals, trust indicators, and account safety status.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium" onClick={handleExport}>
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button
            size="sm"
            className="btn-primary-motion gap-1.5 font-semibold"
            onClick={() => handleTabChange("requests")}
          >
            <ListChecks className="h-3.5 w-3.5" />
            Review Pending Requests
          </Button>
        </div>
      </div>

      {/* Search */}
      <AdminSearchBar
        placeholder="Search by user, email, phone, verification ID, or user ID..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* KPI summary cards */}
      <VerificationSummaryCards />

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          {VERIFICATION_TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <VerificationOverview verifications={verifications} />
        </TabsContent>

        {(["requests", "verified", "trust_reviews", "history"] as const).map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4 flex flex-col gap-4">
            <VerificationFiltersBar filters={filters} onChange={handleFiltersChange} onClear={handleClearFilters} />

            <Card className="overflow-hidden py-0">
              <CardContent className="p-0">
                <VerificationTable
                  verifications={pagedVerifications}
                  isLoading={isLoading}
                  isError={isError}
                  onRetry={handleRetry}
                  onViewDetails={setSelectedVerification}
                  onMarkVerified={setMarkVerifiedTarget}
                  onMarkNeedsAttention={handleMarkNeedsAttention}
                  onRequestAdditional={setAdditionalDialogTarget}
                  onReject={setRejectTarget}
                  onSuspend={setSuspendTarget}
                />
              </CardContent>
              {!isLoading && !isError && (
                <VerificationsPagination
                  page={page}
                  totalPages={totalPages}
                  totalResults={filteredVerifications.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                />
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <VerificationDetailDrawer
        verification={selectedVerification}
        onOpenChange={(open) => !open && setSelectedVerification(null)}
        onAddNote={handleAddNote}
        onMarkVerified={setMarkVerifiedTarget}
        onMarkNeedsAttention={handleMarkNeedsAttention}
        onRequestAdditional={setAdditionalDialogTarget}
        onReject={setRejectTarget}
        onSuspend={setSuspendTarget}
      />

      <AdditionalVerificationDialog
        open={!!additionalDialogTarget}
        onOpenChange={(open) => !open && setAdditionalDialogTarget(null)}
        verification={additionalDialogTarget}
        onSend={handleRequestAdditionalSend}
      />
      <MarkVerifiedDialog
        open={!!markVerifiedTarget}
        onOpenChange={(open) => !open && setMarkVerifiedTarget(null)}
        verification={markVerifiedTarget}
        onConfirm={handleMarkVerifiedConfirm}
      />
      <SuspendAccountDialog
        open={!!suspendTarget}
        onOpenChange={(open) => !open && setSuspendTarget(null)}
        verification={suspendTarget}
        onConfirm={handleSuspendConfirm}
      />
      <RejectVerificationDialog
        open={!!rejectTarget}
        onOpenChange={(open) => !open && setRejectTarget(null)}
        verification={rejectTarget}
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
}

/** Wraps the verifications page in its own local ToastProvider (see components/admin/toast-provider.tsx for why). */
export function VerificationsClient() {
  return (
    <ToastProvider>
      <VerificationsClientInner />
    </ToastProvider>
  );
}
