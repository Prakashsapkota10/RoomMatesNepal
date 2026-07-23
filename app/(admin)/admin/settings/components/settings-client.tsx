"use client";

import { useMemo, useState } from "react";
import { ToastProvider } from "@/components/admin/toast-provider";
import { usePlatformSettings } from "./use-platform-settings";
import { useUnsavedChangesWarning } from "./use-unsaved-changes-warning";
import { SettingsSearchBar, getMatchingSectionKeys } from "./settings-search-bar";
import { SettingsEmptyState } from "./settings-empty-state";
import { SaveActionBar } from "./save-action-bar";
import { GeneralConfigCard } from "./general-config-card";
import { SecurityCard } from "./security-card";
import { ListingModerationCard } from "./listing-moderation-card";
import { VerificationTrustCard } from "./verification-trust-card";
import { NotificationPreferencesCard } from "./notification-preferences-card";
import { AiMatchingCard } from "./ai-matching-card";
import { RolesAccessCard } from "./roles-access-card";
import { MaintenanceCard } from "./maintenance-card";
import { DangerZoneCard } from "./danger-zone-card";
import { INITIAL_ROLES } from "./mock-settings";
import type { AdminRole } from "./types";

function SettingsClientInner() {
  const { settings, updateSettings, hasUnsavedChanges, isSaving, save, discard } = usePlatformSettings();
  const [roles, setRoles] = useState<AdminRole[]>(INITIAL_ROLES);
  const [search, setSearch] = useState("");

  useUnsavedChangesWarning(hasUnsavedChanges);

  const visibleSections = useMemo(() => getMatchingSectionKeys(search), [search]);
  const hasNoResults = search.trim() !== "" && visibleSections.size === 0;

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage global platform configurations, security protocols, trust systems, and system health.
          </p>
        </div>
      </div>

      <SettingsSearchBar value={search} onChange={setSearch} />

      {hasNoResults ? (
        <SettingsEmptyState query={search} />
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-5">
          {/* Main content column */}
          <div className="flex flex-col gap-5">
            {visibleSections.has("general") && (
              <GeneralConfigCard
                value={settings.general}
                onChange={(general) => updateSettings((prev) => ({ ...prev, general }))}
              />
            )}
            {visibleSections.has("listing") && (
              <ListingModerationCard
                value={settings.listing}
                onChange={(listing) => updateSettings((prev) => ({ ...prev, listing }))}
              />
            )}
            {visibleSections.has("verification") && (
              <VerificationTrustCard
                value={settings.verification}
                onChange={(verification) => updateSettings((prev) => ({ ...prev, verification }))}
              />
            )}
            {visibleSections.has("notifications") && (
              <NotificationPreferencesCard
                value={settings.notifications}
                onChange={(notifications) => updateSettings((prev) => ({ ...prev, notifications }))}
              />
            )}
            {visibleSections.has("roles") && <RolesAccessCard roles={roles} onChange={setRoles} />}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {visibleSections.has("security") && (
              <SecurityCard
                value={settings.security}
                onChange={(security) => updateSettings((prev) => ({ ...prev, security }))}
              />
            )}
            {visibleSections.has("aiMatching") && (
              <AiMatchingCard
                value={settings.aiMatching}
                onChange={(aiMatching) => updateSettings((prev) => ({ ...prev, aiMatching }))}
              />
            )}
            {visibleSections.has("maintenance") && (
              <MaintenanceCard
                value={settings.maintenance}
                onChange={(maintenance) => updateSettings((prev) => ({ ...prev, maintenance }))}
              />
            )}
            {visibleSections.has("danger") && <DangerZoneCard />}
          </div>
        </div>
      )}

      <SaveActionBar
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onSave={save}
        onDiscard={discard}
      />
    </div>
  );
}

/** Wraps the settings page in its own local ToastProvider (see components/admin/toast-provider.tsx for why). */
export function SettingsClient() {
  return (
    <ToastProvider>
      <SettingsClientInner />
    </ToastProvider>
  );
}
