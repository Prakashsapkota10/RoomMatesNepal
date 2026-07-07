import { NextRequest, NextResponse } from "next/server";

// GET /api/users/me/preferences
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// PUT /api/users/me/preferences
export async function PUT(req: NextRequest) {
  // TODO: validate and upsert preferences
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
