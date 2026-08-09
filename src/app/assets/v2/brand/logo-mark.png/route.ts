import { head } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new NextResponse("Logo not configured", { status: 404 });
  }

  try {
    const blob = await head("assets/v2/brand/logo-mark.png");
    return NextResponse.redirect(blob.url);
  } catch {
    return new NextResponse("Logo not found", { status: 404 });
  }
}
