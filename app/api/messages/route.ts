import { NextRequest, NextResponse } from "next/server";

// GET /api/messages  — list conversations for current user
export async function GET(req: NextRequest) {
  // TODO: verify session, return thread list
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// POST /api/messages  — start a new conversation
export async function POST(req: NextRequest) {
  // TODO: validate body { recipientId, listingId?, text }, insert thread + message
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
