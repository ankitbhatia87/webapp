import { head } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const configuredUrl = process.env.BLOB_RESUME_URL;
    if (configuredUrl) {
      if (request.url.includes("redirect=1")) {
        return NextResponse.redirect(configuredUrl);
      }
      if (request.url.includes("download=1")) {
        const blobResponse = await fetch(configuredUrl);
        if (!blobResponse.ok) throw new Error(`Resume fetch failed: ${blobResponse.status}`);
        return new Response(blobResponse.body, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="resume.pdf"',
          },
        });
      }
      return NextResponse.json({ url: configuredUrl });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      if (request.url.includes("redirect=1") || request.url.includes("download=1")) {
        return NextResponse.redirect(new URL("/pdf/resume.pdf", request.url));
      }
      return NextResponse.json({ url: "/pdf/resume.pdf" });
    }

    const resume = await head("resume/resume.pdf");
    const url = resume.url;
    if (request.url.includes("download=1")) {
      const blobResponse = await fetch(url);
      if (!blobResponse.ok) throw new Error(`Resume fetch failed: ${blobResponse.status}`);
      return new Response(blobResponse.body, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="resume.pdf"',
          "Cache-Control": "private, max-age=300",
        },
      });
    }
    if (request.url.includes("redirect=1") || request.url.includes("download=1")) {
      return NextResponse.redirect(new URL(url, request.url));
    }
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    if (request.url.includes("redirect=1")) {
      return NextResponse.redirect(new URL("/pdf/resume.pdf", request.url));
    }
    return NextResponse.json({ url: "/pdf/resume.pdf" });
  }
}
