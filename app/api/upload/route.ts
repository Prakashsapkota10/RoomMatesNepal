import { NextRequest, NextResponse } from "next/server";

// POST /api/upload  — generic file upload (images for listings, verification docs)
export async function POST(req: NextRequest) {
  // TODO: parse multipart form, validate file type/size, upload to storage, return url
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
