import { NextRequest, NextResponse } from "next/server";

// POST /api/reports  — submit a report against a user or listing
export async function POST(req: NextRequest) {
  // TODO: validate body { targetType: 'user'|'listing', targetId, reason }
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
