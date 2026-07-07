import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/logout
export async function POST(req: NextRequest) {
  // TODO: destroy session / clear cookie
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
