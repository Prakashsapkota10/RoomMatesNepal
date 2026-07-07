import { NextRequest, NextResponse } from "next/server";

// GET /api/matches/[id]  — get compatibility details between current user and another
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
