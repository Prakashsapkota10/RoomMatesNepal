import { NextRequest, NextResponse } from "next/server";

// GET /api/users/me  — get current user profile
export async function GET(req: NextRequest) {
  // TODO: verify session, return user
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// PATCH /api/users/me  — update current user profile
export async function PATCH(req: NextRequest) {
  // TODO: validate body, update user
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
