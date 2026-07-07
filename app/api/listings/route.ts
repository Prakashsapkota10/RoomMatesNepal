import { NextRequest, NextResponse } from "next/server";

// GET /api/listings  — list/search listings
export async function GET(req: NextRequest) {
  // TODO: parse query params (city, price, type, page, limit), return paginated results
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// POST /api/listings  — create listing
export async function POST(req: NextRequest) {
  // TODO: validate body, verify session, insert listing
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
