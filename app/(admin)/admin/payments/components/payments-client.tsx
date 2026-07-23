"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { ToastProvider, useToast } from "@/components/admin/toast-provider";
import { PaymentSummaryCards } from "./payment-summary-cards";
import { PaymentFiltersBar } from "./payment-filters-bar";
import { PaymentTable } from "./payment-table";
import { PaymentsPagination } from "./payments-pagination";
import { PaymentDetailDrawer } from "./payment-detail-drawer";
import { MOCK_PAYMENTS } from "./mock-payments";
import { PAGE_SIZE, PAYMENT_TABS } from "./constants";
import { matchesFilters, matchesSearch, matchesTab } from "./payment.utils";
import { DEFAULT_PAYMENT_FILTERS, type PaymentFiltersState, type PaymentRow, type PaymentTab } from "./types";

/**
 * Client shell for /admin/payments — KPI cards, payment-type tabs, search,
 * filters, transaction table, pagination, and the transaction detail
 * drawer. All filtering/pagination below is client-side over mock data.
 * TODO: replace with server-driven search + filtered/paginated payment queries.
 */
function PaymentsClientInner() {
  const { showToast } = useToast();

  const [payments, setPayments] = useState<PaymentRow[]>(MOCK_PAYMENTS);
  const [tab, setTab] = useState<PaymentTab>("all");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<PaymentFiltersState>(DEFAULT_PAYMENT_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(null);

  // Simulated initial load — mirrors what a real `await fetch(...)` would look
  // like; kept short since this is mock data. isError is left wired up for a
  // real API to flip on failure (see PaymentTable's error branch).
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

  const filteredPayments = useMemo(() => {
    return payments.filter(
      (p) => matchesTab(p, tab) && matchesFilters(p, filters) && matchesSearch(p, search)
    );
  }, [payments, tab, filters, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / PAGE_SIZE));
  const pagedPayments = filteredPayments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTabChange(next: string) {
    setTab(next as PaymentTab);
    setPage(1);
  }

  function handleFiltersChange(next: PaymentFiltersState) {
    setFilters(next);
    setPage(1);
  }

  function handleClearFilters() {
    setFilters(DEFAULT_PAYMENT_FILTERS);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleInvoiceGenerated(paymentId: string, invoiceId: string) {
    const now = new Date().toISOString();
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, invoiceId, invoiceGeneratedAt: now } : p))
    );
    setSelectedPayment((prev) => (prev && prev.id === paymentId ? { ...prev, invoiceId, invoiceGeneratedAt: now } : prev));
  }

  function handleExport() {
    showToast(`Exporting ${filteredPayments.length} payments to CSV...`, "info");
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Payment Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor subscriptions, monthly rent payments, security deposits, invoices, and platform payment
            activity.
          </p>
        </div>
        <Button variant="outline" size="sm" className="btn-secondary-motion gap-1.5 font-medium shrink-0" onClick={handleExport}>
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Search */}
      <AdminSearchBar
        placeholder="Search by Payment ID or User..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* KPI summary cards */}
      <PaymentSummaryCards />

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          {PAYMENT_TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Filters */}
        <div className="mt-4">
          <PaymentFiltersBar filters={filters} onChange={handleFiltersChange} onClear={handleClearFilters} />
        </div>

        {PAYMENT_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="mt-4">
            <Card className="overflow-hidden py-0">
              <CardContent className="p-0">
                <PaymentTable
                  payments={pagedPayments}
                  isLoading={isLoading}
                  isError={isError}
                  onRetry={handleRetry}
                  onViewDetails={setSelectedPayment}
                  onInvoiceGenerated={handleInvoiceGenerated}
                />
              </CardContent>
              {!isLoading && !isError && (
                <PaymentsPagination
                  page={page}
                  totalPages={totalPages}
                  totalResults={filteredPayments.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                />
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <PaymentDetailDrawer
        payment={selectedPayment}
        onOpenChange={(open) => !open && setSelectedPayment(null)}
        onInvoiceGenerated={handleInvoiceGenerated}
      />
    </div>
  );
}

/** Wraps the payments page in its own local ToastProvider (see components/admin/toast-provider.tsx for why). */
export function PaymentsClient() {
  return (
    <ToastProvider>
      <PaymentsClientInner />
    </ToastProvider>
  );
}
