"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Home,
  Shield,
  Lock,
  Palette,
} from "lucide-react";
import { AccountTab } from "./account-tab";
import { NotificationsTab } from "./notifications-tab";
import { LivingPreferencesTab } from "./living-preferences-tab";
import { PrivacyTab } from "./privacy-tab";
import { SecurityTab } from "./security-tab";
import { AppearanceTab } from "./appearance-tab";

const SETTINGS_TABS = [
  { key: "account", label: "Account", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "living-preferences", label: "Living Preferences", icon: Home },
  { key: "privacy", label: "Privacy", icon: Shield },
  { key: "security", label: "Security", icon: Lock },
  { key: "appearance", label: "Appearance", icon: Palette },
] as const;

type SettingsTabKey = (typeof SETTINGS_TABS)[number]["key"];

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState<SettingsTabKey>("account");

  return (
    <div className="flex flex-col lg:flex-row gap-6 page-enter">
      {/* Left sidebar navigation */}
      <aside className="lg:w-56 shrink-0">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-primary">Settings</h2>
          <p className="text-xs text-muted-foreground">Manage your preferences</p>
        </div>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {activeTab === "account" && <AccountTab />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "living-preferences" && <LivingPreferencesTab />}
        {activeTab === "privacy" && <PrivacyTab />}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "appearance" && <AppearanceTab />}
      </div>
    </div>
  );
}
