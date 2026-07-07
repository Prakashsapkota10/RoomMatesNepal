import { NextRequest, NextResponse } from "next/server";

// GET /api/users/me/verification  — get verification status
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// POST /api/users/me/verification  — submit verification documents
export async function POST(req: NextRequest) {
  // TODO: accept document uploads, queue for admin review
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
