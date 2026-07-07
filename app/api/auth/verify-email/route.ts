import { NextRequest, NextResponse } from "next/server";

// GET /api/auth/verify-email?token=...
export async function GET(req: NextRequest) {
  // TODO: validate token, mark email as verified
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
