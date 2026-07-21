"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSearchBar } from "@/components/admin/admin-search-bar";
import { UserFiltersBar, DEFAULT_FILTERS, type UserFiltersState } from "./user-filters-bar";
import { UserStatsRow } from "./user-stats-row";
import { UsersTable } from "./users-table";
import { UsersPagination } from "./users-pagination";
import { MOCK_ADMIN_USERS } from "./mock-users";

const PAGE_SIZE = 3;

/**
 * Client shell for /admin/users — search, filters, table, and pagination.
 * All filtering/pagination below is client-side over mock data.
 * TODO: replace with server-driven search + filtered/paginated queries.
 */
export function UsersClient() {
  const [filters, setFilters] = useState<UserFiltersState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return MOCK_ADMIN_USERS.filter((u) => {
      if (filters.role !== "all" && u.role !== filters.role) return false;
      if (filters.status !== "all" && u.status !== filters.status) return false;
      if (filters.city !== "all" && u.city.toLowerCase() !== filters.city) return false;
      if (filters.verification !== "all" && u.verification !== filters.verification) return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const pageUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFiltersChange(next: UserFiltersState) {
    setFilters(next);
    setPage(1);
  }

  function handleClearFilters() {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, verify, and manage the room seekers and owners of Nepal.
          </p>
        </div>
      </div>

      {/* Stats summary */}
      <UserStatsRow />

      {/* Search */}
      <AdminSearchBar placeholder="Search users by name, email, or ID..." />

      {/* Filters */}
      <UserFiltersBar filters={filters} onChange={handleFiltersChange} onClear={handleClearFilters} />

      {/* Results count */}
      <p className="text-xs text-muted-foreground -mb-2">
        Showing {pageUsers.length} of {filteredUsers.length} users
      </p>

      {/* Table */}
      <Card className="overflow-hidden py-0">
        <CardContent className="p-0">
          <UsersTable users={pageUsers} />
        </CardContent>
        <UsersPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </Card>
    </div>
  );
}
