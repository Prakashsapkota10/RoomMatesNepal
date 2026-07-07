import { NextRequest, NextResponse } from "next/server";

// POST /api/users/me/avatar  — upload profile photo
export async function POST(req: NextRequest) {
  // TODO: parse multipart form, upload to storage, save url
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// DELETE /api/users/me/avatar
export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
