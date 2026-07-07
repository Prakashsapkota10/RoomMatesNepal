import { NextRequest, NextResponse } from "next/server";

// GET /api/roommates  — list roommate seekers
export async function GET(req: NextRequest) {
  // TODO: parse query params, return paginated seeker profiles
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// POST /api/roommates  — post a roommate request
export async function POST(req: NextRequest) {
  // TODO: validate body, verify session, insert seeker post
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
