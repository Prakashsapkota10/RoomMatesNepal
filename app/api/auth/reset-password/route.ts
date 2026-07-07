import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/reset-password
export async function POST(req: NextRequest) {
  // TODO: validate token, update password
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
