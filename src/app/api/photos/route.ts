import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import type { PhotoItem } from "@/lib/types";
import { slugToCategory } from "@/lib/types";

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: "photos/",
    });

    const photos: PhotoItem[] = blobs
      .filter((blob) => {
        const ext = blob.pathname.split(".").pop()?.toLowerCase();
        return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "");
      })
      .map((blob) => {
        // Extract category from the pathname: photos/{category-slug}/{filename}
        const parts = blob.pathname.split("/");
        const categorySlug = parts[1] || "maternity";
        const category = slugToCategory(categorySlug);

        return {
          url: blob.url,
          pathname: blob.pathname,
          category,
          alt: parts[2]?.split(".")[0]?.replace(/-/g, " ") || "Gallery photo",
          uploadedAt: blob.uploadedAt.toISOString(),
        };
      })
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
