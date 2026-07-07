import { NextRequest, NextResponse } from "next/server";

// PATCH /api/admin/reports/[id]  — resolve or dismiss report
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
