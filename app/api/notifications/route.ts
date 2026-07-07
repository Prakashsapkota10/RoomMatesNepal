import { NextRequest, NextResponse } from "next/server";

// GET /api/notifications  — list notifications for current user
export async function GET(req: NextRequest) {
  // TODO: verify session, return paginated notifications
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
