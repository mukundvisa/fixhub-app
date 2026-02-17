import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();

    if (!path) {
      return Response.json(
        { message: "Path is required" },
        { status: 400 }
      );
    }

    revalidatePath(path);

    return Response.json({
      revalidated: true,
      path,
      now: Date.now(),
    });

  } catch (error) {
    return Response.json(
      { message: "Error revalidating path" },
      { status: 500 }
    );
  }
}
