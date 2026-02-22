import { put, del, head } from "@vercel/blob";
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
    const { url, categories } = (await request.json()) as {
      url: string;
      categories: Category[];
    };

    if (!url || !categories || categories.length === 0) {
      return NextResponse.json(
        { error: "url and categories are required" },
        { status: 400 }
      );
    }

    // Fetch the existing blob as a stream
    const existingBlob = await head(url);
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch existing photo" },
        { status: 500 }
      );
    }

    // Extract original filename from pathname
    // Pathname format: photos/{timestamp}_{OldCategories}_{filename}.ext
    const pathname = existingBlob.pathname;
    const filename = pathname.replace("photos/", "");
    const parts = filename.split("_");

    // Get the actual file portion — everything after the first two underscore-separated parts
    const originalFile =
      parts.length >= 3
        ? parts.slice(2).join("_")
        : parts[parts.length - 1];

    // Build new pathname with updated categories
    const categoriesSlug = categories.join("-");
    const newPathname = `photos/${Date.now()}_${categoriesSlug}_${originalFile}`;

    const blob = await response.blob();

    // Upload with new pathname
    const newBlob = await put(newPathname, blob, {
      access: "public",
      addRandomSuffix: false,
      contentType: existingBlob.contentType,
    });

    // Delete the old blob
    await del(url);

    return NextResponse.json({
      url: newBlob.url,
      pathname: newBlob.pathname,
      categories,
    });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
