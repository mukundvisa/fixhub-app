import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tag = body.tag;

    if (!tag) {
      return Response.json({
        revalidated: false,
        message: "Missing tag",
      }, { status: 400 });
    }

    revalidateTag(tag, "max");

    return Response.json({
      revalidated: true,
      tag,
      now: Date.now(),
    });

  } catch (error) {
    return Response.json({
      revalidated: false,
      message: "Error parsing request",
    }, { status: 500 });
  }
}
