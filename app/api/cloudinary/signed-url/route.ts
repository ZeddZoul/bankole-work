import { NextRequest, NextResponse } from "next/server";
import { generateSignedVideoUrl, generatePosterUrl } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const { publicId, type = "video" } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    let signedUrl;

    if (type === "poster") {
      signedUrl = generatePosterUrl(publicId);
    } else {
      signedUrl = generateSignedVideoUrl(publicId);
    }

    return NextResponse.json({
      signedUrl,
      publicId,
      type,
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}

// Optional: GET method for simpler usage
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get("id");
  const type = searchParams.get("type") || "video";

  if (!publicId) {
    return NextResponse.json(
      { error: "Public ID is required" },
      { status: 400 }
    );
  }

  try {
    let signedUrl;

    if (type === "poster") {
      signedUrl = generatePosterUrl(publicId);
    } else {
      signedUrl = generateSignedVideoUrl(publicId);
    }

    return NextResponse.json({
      signedUrl,
      publicId,
      type,
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}
