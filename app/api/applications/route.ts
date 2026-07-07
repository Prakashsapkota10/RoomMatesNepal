import { NextRequest, NextResponse } from "next/server";

// GET /api/applications  — list applications (sent or received, filtered by query param)
// ?type=sent | ?type=received
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// POST /api/applications  — apply to a listing
export async function POST(req: NextRequest) {
  // TODO: validate body { listingId, message }, verify session
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
