"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Settings2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { ToastProvider, useToast } from "@/components/admin/toast-provider";
import { SubscriptionSummaryCards } from "./subscription-summary-cards";
import { SubscriptionAnalytics } from "./subscription-analytics";
import { RetentionHealth } from "./retention-health";
import { PlanBreakdown } from "./plan-breakdown";
import { SubscriptionFiltersBar } from "./subscription-filters-bar";
import { SubscriptionTable } from "./subscription-table";
import { SubscriptionsPagination } from "./subscriptions-pagination";
import { SubscriptionDetailDrawer } from "./subscription-detail-drawer";
import {
  CancelSubscriptionDialog,
  DisableAutoRenewDialog,
  ReactivateSubscriptionDialog,
} from "./cancel-subscription-dialog";
import { MOCK_SUBSCRIPTIONS } from "./mock-subscriptions";
import { PAGE_SIZE, PLAN_LABELS, SUBSCRIPTION_TABS } from "./constants";
import { matchesFilters, matchesSearch, matchesTab } from "./subscription.utils";
import {
  DEFAULT_SUBSCRIPTION_FILTERS,
  type SubscriptionFiltersState,
  type SubscriptionRow,
  type SubscriptionTab,
} from "./types";

/**
 * Client shell for /admin/subscriptions — KPI cards, MRR analytics,
 * retention health, plan breakdown, search, filters, the subscription
 * table, pagination, and the detail drawer with all admin actions and
 * confirmation dialogs. All filtering/pagination below is client-side over
 * mock data.
 * TODO: replace with server-driven search + filtered/paginated subscription queries.
 */
function SubscriptionsClientInner() {
  const { showToast } = useToast();

  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>(MOCK_SUBSCRIPTIONS);
  const [tab, setTab] = useState<SubscriptionTab>("all");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<SubscriptionFiltersState>(DEFAULT_SUBSCRIPTION_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionRow | null>(null);

  const [cancelTarget, setCancelTarget] = useState<SubscriptionRow | null>(null);
  const [disableAutoRenewTarget, setDisableAutoRenewTarget] = useState<SubscriptionRow | null>(null);
  const [reactivateTarget, setReactivateTarget] = useState<SubscriptionRow | null>(null);

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

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(
      (s) => matchesTab(s, tab) && matchesFilters(s, filters) && matchesSearch(s, search, PLAN_LABELS[s.planId])
    );
  }, [subscriptions, tab, filters, search]);

  const totalPages = Math.max(1, Math.ceil(filteredSubscriptions.length / PAGE_SIZE));
  const pagedSubscriptions = filteredSubscriptions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateSubscription(id: string, updater: (s: SubscriptionRow) => SubscriptionRow) {
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? updater(s) : s)));
    setSelectedSubscription((prev) => (prev && prev.id === id ? updater(prev) : prev));
  }

  function handleTabChange(next: string) {
    setTab(next as SubscriptionTab);
    setPage(1);
  }

  function handleFiltersChange(next: SubscriptionFiltersState) {
    setFilters(next);
    setPage(1);
  }

  function handleClearFilters() {
    setFilters(DEFAULT_SUBSCRIPTION_FILTERS);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleExpiringSoonClick() {
    setTab("all");
    setFilters({ ...DEFAULT_SUBSCRIPTION_FILTERS, expiry: "30d" });
    setPage(1);
  }

  function handleExport() {
    showToast(`Exporting ${filteredSubscriptions.length} subscriptions to CSV...`, "info");
  }

  function handleViewPayment(subscription: SubscriptionRow) {
    showToast(`Opening payment ${subscription.lastPayment.relatedPaymentId} in Payment Management.`, "info");
  }

  function handleSendReminder(subscription: SubscriptionRow) {
    showToast(`Payment reminder sent to ${subscription.subscriber.name}.`, "success");
  }

  function handleDisableAutoRenewConfirm() {
    if (!disableAutoRenewTarget) return;
    const now = new Date().toISOString();
    updateSubscription(disableAutoRenewTarget.id, (s) => ({
      ...s,
      autoRenew: false,
      history: [...s.history, { label: "Auto-Renewal Disabled", timestamp: now, actor: "Admin" }],
    }));
    showToast(`Auto-renewal disabled for ${disableAutoRenewTarget.subscriber.name}.`, "info");
  }

  function handleCancelConfirm(atPeriodEnd: boolean) {
    if (!cancelTarget) return;
    const now = new Date().toISOString();
    updateSubscription(cancelTarget.id, (s) => ({
      ...s,
      status: "cancelled",
      autoRenew: false,
      cancelledAt: now,
      cancelAtPeriodEnd: atPeriodEnd,
      nextBillingAt: atPeriodEnd ? s.nextBillingAt : null,
      history: [
        ...s.history,
        {
          label: "Subscription Cancelled",
          timestamp: now,
          actor: "Admin",
          detail: atPeriodEnd ? "Cancelled at end of billing period" : "Cancelled immediately",
        },
      ],
    }));
    showToast(`${cancelTarget.subscriber.name}'s subscription was cancelled.`, "error");
  }

  function handleReactivateConfirm() {
    if (!reactivateTarget) return;
    const now = new Date().toISOString();
    updateSubscription(reactivateTarget.id, (s) => ({
      ...s,
      status: "active",
      cancelledAt: null,
      cancelAtPeriodEnd: false,
      history: [...s.history, { label: "Subscription Reactivated", timestamp: now, actor: "Admin" }],
    }));
    showToast(`${reactivateTarget.subscriber.name}'s subscription was reactivated.`, "success");
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Subscription Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage subscription plans, active subscribers, billing cycles, renewals, and subscription lifecycle.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium" onClick={handleExport}>
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="btn-secondary-motion gap-1.5 font-medium"
            onClick={() => showToast("Plan management is not available yet.", "info")}
          >
            <Settings2 className="h-3.5 w-3.5" />
            Manage Plans
          </Button>
        </div>
      </div>

      {/* Search */}
      <AdminSearchBar
        placeholder="Search subscriptions, users, or subscription IDs..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* KPI summary cards */}
      <SubscriptionSummaryCards onExpiringSoonClick={handleExpiringSoonClick} />

      {/* MRR analytics + Retention health */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <SubscriptionAnalytics />
        <div className="flex flex-col gap-4">
          <RetentionHealth subscriptions={subscriptions} />
          <PlanBreakdown subscriptions={subscriptions} />
        </div>
      </div>

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          {SUBSCRIPTION_TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Filters */}
        <div className="mt-4">
          <SubscriptionFiltersBar filters={filters} onChange={handleFiltersChange} onClear={handleClearFilters} />
        </div>

        {SUBSCRIPTION_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="mt-4">
            <Card className="overflow-hidden py-0">
              <CardContent className="p-0">
                <SubscriptionTable
                  subscriptions={pagedSubscriptions}
                  isLoading={isLoading}
                  isError={isError}
                  onRetry={handleRetry}
                  onViewDetails={setSelectedSubscription}
                  onViewPayment={handleViewPayment}
                  onSendReminder={handleSendReminder}
                  onDisableAutoRenew={setDisableAutoRenewTarget}
                  onCancel={setCancelTarget}
                  onReactivate={setReactivateTarget}
                />
              </CardContent>
              {!isLoading && !isError && (
                <SubscriptionsPagination
                  page={page}
                  totalPages={totalPages}
                  totalResults={filteredSubscriptions.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                />
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <SubscriptionDetailDrawer
        subscription={selectedSubscription}
        onOpenChange={(open) => !open && setSelectedSubscription(null)}
        onSendReminder={handleSendReminder}
        onDisableAutoRenew={setDisableAutoRenewTarget}
        onCancel={setCancelTarget}
        onReactivate={setReactivateTarget}
      />

      <CancelSubscriptionDialog
        open={!!cancelTarget}
        onOpenChange={(open) => !open && setCancelTarget(null)}
        subscription={cancelTarget}
        onConfirm={handleCancelConfirm}
      />
      <DisableAutoRenewDialog
        open={!!disableAutoRenewTarget}
        onOpenChange={(open) => !open && setDisableAutoRenewTarget(null)}
        subscription={disableAutoRenewTarget}
        onConfirm={handleDisableAutoRenewConfirm}
      />
      <ReactivateSubscriptionDialog
        open={!!reactivateTarget}
        onOpenChange={(open) => !open && setReactivateTarget(null)}
        subscription={reactivateTarget}
        onConfirm={handleReactivateConfirm}
      />
    </div>
  );
}

/** Wraps the subscriptions page in its own local ToastProvider (see components/admin/toast-provider.tsx for why). */
export function SubscriptionsClient() {
  return (
    <ToastProvider>
      <SubscriptionsClientInner />
    </ToastProvider>
  );
}
