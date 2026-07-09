import { NextRequest, NextResponse } from "next/server";

// GET /api/users/[id]/reviews
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// POST /api/users/[id]/reviews  — submit review for user
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: validate session, prevent self-review, insert review
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
