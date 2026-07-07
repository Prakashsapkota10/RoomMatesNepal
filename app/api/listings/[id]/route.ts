import { NextRequest, NextResponse } from "next/server";

// GET /api/listings/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: fetch listing by id
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// PATCH /api/listings/[id]  — update listing
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: validate body, verify ownership, update listing
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// DELETE /api/listings/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: verify ownership, soft-delete listing
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
