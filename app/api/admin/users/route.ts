import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/users  — list all users (admin only)
export async function GET(req: NextRequest) {
  // TODO: verify admin role, return paginated users
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
