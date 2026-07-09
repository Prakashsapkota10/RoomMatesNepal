import { NextRequest, NextResponse } from "next/server";

// GET /api/messages/[id]  — get messages in a conversation thread
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// POST /api/messages/[id]  — send a message in a thread
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
