import { NextRequest, NextResponse } from "next/server";

// POST /api/notifications/read-all  — mark all notifications as read
export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
