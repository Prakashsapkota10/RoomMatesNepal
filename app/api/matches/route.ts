import { NextRequest, NextResponse } from "next/server";

// GET /api/matches  — get AI matches for current user
export async function GET(req: NextRequest) {
  // TODO: verify session, run compatibility algorithm, return ranked matches
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
