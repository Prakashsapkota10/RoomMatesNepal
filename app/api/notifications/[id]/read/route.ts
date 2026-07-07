import { NextRequest, NextResponse } from "next/server";

// POST /api/notifications/[id]/read  — mark a notification as read
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
