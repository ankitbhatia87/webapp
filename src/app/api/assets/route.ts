import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

const FALLBACKS = {
  logoFull: "/assets/v2/brand/logo-full.png",
  logoMark: "/assets/v2/brand/logo-mark.png",
  profilePhoto: "/assets/v2/brand/profile-photo.jpg",
  workBanners: {} as Record<string, string>,
};

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(FALLBACKS);
  }

  try {
    const { blobs } = await list({ prefix: "assets/v2/" });
    const assets = { ...FALLBACKS, workBanners: { ...FALLBACKS.workBanners } };

    for (const blob of blobs) {
      const path = blob.pathname.toLowerCase();
      const filename = path.split("/").pop() ?? path;
      if (filename.startsWith("logo-full.")) assets.logoFull = blob.url;
      else if (filename.startsWith("logo-mark.")) assets.logoMark = blob.url;
      else if (filename.startsWith("profile-photo.")) assets.profilePhoto = blob.url;
      else if (path.startsWith("assets/v2/work/") || filename.includes("banner")) {
        const name = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
        const projectKey = name.match(/^(p[123])(?:[-_].*)?$/)?.[1]
          ?? (name.includes("banxa") ? "p1" : name.includes("novo") ? "p2" : name.includes("sber") ? "p3" : undefined);
        if (projectKey) assets.workBanners[projectKey] = blob.url;
        else if (name) assets.workBanners[name] = blob.url;
      }
    }

    return NextResponse.json(assets);
  } catch (error) {
    console.error("Failed to fetch Vercel Blob assets:", error);
    return NextResponse.json(FALLBACKS);
  }
}
