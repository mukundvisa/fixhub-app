import { NextRequest } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { path, tag } = await request.json();

    if (!path && !tag) {
      return Response.json(
        {
          revalidated: false,
          message: "Provide at least 'path' or 'tag'",
        },
        { status: 400 }
      );
    }

    if (path) {
      revalidatePath(path);
    }

    if (tag) {
      revalidateTag(tag, "max");
    }

    return Response.json({
      revalidated: true,
      path: path ?? null,
      tag: tag ?? null,
      now: Date.now(),
    });

  } catch (error) {
    return Response.json(
      {
        revalidated: false,
        message: "Error processing request",
      },
      { status: 500 }
    );
  }
}
