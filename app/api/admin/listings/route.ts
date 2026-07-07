import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/listings  — list all listings (admin only)
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
