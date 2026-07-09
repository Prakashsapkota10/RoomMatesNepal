import { NextRequest, NextResponse } from "next/server";

// POST /api/notifications/[id]/read  — mark a notification as read
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
