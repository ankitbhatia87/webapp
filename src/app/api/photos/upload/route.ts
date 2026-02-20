import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import type { Category } from "@/lib/types";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const categoriesStr = formData.get("categories") as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    let categories: Category[] = [];
    try {
      categories = JSON.parse(categoriesStr || "[]");
    } catch {
      categories = ["Maternity"]; // Default fallback
    }

    if (categories.length === 0) {
      return NextResponse.json(
        { error: "At least one category required" },
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

      const timestamp = Date.now();
      const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
      
      // Encode categories in pathname: photos/{timestamp}_{categories}_{filename}
      // Example: photos/1234567890_Maternity-Portraits_image.jpg
      const categoriesSlug = categories.join("-");
      const pathname = `photos/${timestamp}_${categoriesSlug}_${cleanFilename}`;

      const blob = await put(pathname, file, {
        access: "public",
        addRandomSuffix: false,
      });

      results.push({
        url: blob.url,
        pathname: blob.pathname,
        categories,
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
