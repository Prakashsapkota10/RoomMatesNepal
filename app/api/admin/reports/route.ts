import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/reports  — list all user-submitted reports
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
