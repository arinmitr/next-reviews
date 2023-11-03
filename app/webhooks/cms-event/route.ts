import { CACHE_TAG_REVIEWS } from "@/lib/reviews";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const payload = await request.json();
  console.log("payload", payload);
  if (payload.model === "review") {
    revalidateTag(CACHE_TAG_REVIEWS);
    console.log("Revalidated", CACHE_TAG_REVIEWS);
  }
  return new Response(null, { status: 204 });
};
