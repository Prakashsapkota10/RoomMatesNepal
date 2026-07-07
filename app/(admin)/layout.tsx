import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/navigation/admin-sidebar";
import { DashboardTopbar } from "@/components/navigation/dashboard-topbar";
import { getSession } from "@/lib/auth";

/**
 * AdminLayout — role-gated shell for all /admin/* routes.
 * Redirects to /login if unauthenticated, /403 if not admin.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/403");

  // TODO: fetch real admin data from your DB/API
  const admin = {
    name: "Admin User",
    email: "admin@roommatenepal.com",
    avatar: undefined as string | undefined,
    pendingReports: 7,
    pendingVerifications: 12,
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AdminSidebar
          adminName={admin.name}
          adminEmail={admin.email}
          adminAvatar={admin.avatar}
          pendingReports={admin.pendingReports}
          pendingVerifications={admin.pendingVerifications}
        />

        <SidebarInset className="flex flex-1 flex-col min-w-0">
          <DashboardTopbar showSearch={false} />
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
