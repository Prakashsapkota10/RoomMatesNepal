import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/register
export async function POST(req: NextRequest) {
  // TODO: validate body, create user, send verification email
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
