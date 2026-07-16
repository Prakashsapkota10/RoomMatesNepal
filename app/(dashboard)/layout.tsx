import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";
import { DashboardTopbar } from "@/components/navigation/dashboard-topbar";
import { getSession } from "@/lib/auth";

/**
 * DashboardLayout — authenticated user shell with collapsible sidebar.
 * Protects all child routes: redirects to /login if not authenticated.
 * Passes real user data down to sidebar and topbar.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  // TODO: fetch real user data from your DB/API using session.userId
  const user = {
    id: session.userId,
    name: "Ram Shrestha",
    email: "ram@example.com",
    avatar: undefined as string | undefined,
    role: session.role,
    trustScore: 72,
    unreadMessages: 3,
    unreadNotifications: 5,
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          userName={user.name}
          userEmail={user.email}
          userAvatar={user.avatar}
          userRole={user.role}
          trustScore={user.trustScore}
          unreadMessages={user.unreadMessages}
          unreadNotifications={user.unreadNotifications}
        />

        <SidebarInset className="flex flex-1 flex-col min-w-0">
          <DashboardTopbar
            userName={user.name}
            userAvatar={user.avatar}
            unreadNotifications={user.unreadNotifications}
            unreadMessages={user.unreadMessages}
          />
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
