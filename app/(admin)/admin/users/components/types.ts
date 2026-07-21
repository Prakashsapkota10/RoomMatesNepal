import type { UserRole } from "@/types";
import type { AccountStatus } from "./account-status-dot";
import type { VerificationState } from "./verification-badge";

/**
 * Row shape for the admin User Management table.
 * TODO: Replace with the real admin user list DTO returned by the backend.
 */
export interface AdminUserRow {
  id: string;
  displayId: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  trustScore: number;
  verification: VerificationState;
  status: AccountStatus;
}
