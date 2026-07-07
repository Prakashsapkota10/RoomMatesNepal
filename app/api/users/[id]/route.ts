import { NextRequest, NextResponse } from "next/server";

// GET /api/users/[id]  — public user profile
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: return public profile fields only
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
