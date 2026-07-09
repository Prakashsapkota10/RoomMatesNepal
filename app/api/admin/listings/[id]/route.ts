import { NextRequest, NextResponse } from "next/server";

// PATCH /api/admin/listings/[id]  — approve, flag, or remove listing
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// DELETE /api/admin/listings/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
