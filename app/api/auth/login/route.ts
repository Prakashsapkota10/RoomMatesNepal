import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/login
export async function POST(req: NextRequest) {
  // TODO: validate credentials, create session
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
