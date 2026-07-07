import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/forgot-password
export async function POST(req: NextRequest) {
  // TODO: validate email, send reset link
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
