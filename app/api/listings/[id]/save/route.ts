import { NextRequest, NextResponse } from "next/server";

// POST /api/listings/[id]/save  — bookmark a listing
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: verify session, toggle saved state
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// DELETE /api/listings/[id]/save  — remove bookmark
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
