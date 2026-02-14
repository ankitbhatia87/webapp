import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import type { Category } from "@/lib/types";
import { categoryToSlug } from "@/lib/types";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const category = (formData.get("category") as Category) || "Maternity";

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const results = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        continue;
      }

      // Validate file size (max 4.5MB for Vercel free tier)
      if (file.size > 4.5 * 1024 * 1024) {
        continue;
      }

      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase()}`;
      const categorySlug = categoryToSlug(category);
      const pathname = `photos/${categorySlug}/${filename}`;

      const blob = await put(pathname, file, {
        access: "public",
        addRandomSuffix: false,
      });

      results.push({
        url: blob.url,
        pathname: blob.pathname,
        category,
        alt: file.name.split(".")[0].replace(/-|_/g, " "),
        uploadedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      uploaded: results,
      count: results.length,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
