import { NextRequest, NextResponse } from "next/server";

// GET /api/applications/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// PATCH /api/applications/[id]  — update status (accept / reject / withdraw)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // TODO: validate body { status }, verify ownership (listing owner or applicant)
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}

// DELETE /api/applications/[id]  — withdraw application
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
