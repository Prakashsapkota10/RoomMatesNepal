import { NextRequest, NextResponse } from "next/server";

// GET /api/users/[id]  — public user profile
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: return public profile fields only
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
