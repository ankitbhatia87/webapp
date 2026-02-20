import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import type { PhotoItem, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

export async function GET() {
  try {
    // If blob token is not set, return empty array (for local dev without Vercel Blob)
    if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN === 'your-vercel-blob-token-here') {
      return NextResponse.json({ photos: [] });
    }

    const { blobs } = await list({
      prefix: "photos/",
    });

    const photos: PhotoItem[] = blobs
      .filter((blob) => {
        const ext = blob.pathname.split(".").pop()?.toLowerCase();
        return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "");
      })
      .map((blob) => {
        // Parse categories from pathname: photos/{timestamp}_{categories}_{filename}
        // Example: photos/1234567890_Maternity-Portraits_image.jpg
        const filename = blob.pathname.replace("photos/", "");
        const parts = filename.split("_");
        
        let categories: Category[] = [];
        
        if (parts.length >= 2) {
          // Extract categories from the second part
          const categoriesPart = parts[1];
          const categoryNames = categoriesPart.split("-");
          
          // Filter valid categories
          categories = categoryNames.filter((cat) => 
            CATEGORIES.includes(cat as Category)
          ) as Category[];
        }
        
        // Fallback to Maternity if no valid categories
        if (categories.length === 0) {
          categories = ["Maternity"];
        }

        const displayName = parts.slice(2).join("_").split(".")[0] || "photo";

        return {
          url: blob.url,
          pathname: blob.pathname,
          categories,
          alt: displayName.replace(/-|_/g, " "),
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
