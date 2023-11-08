import { SearchReviews } from "@/lib/reviews";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("query");
  if (!query) {
    return NextResponse.json(null);
  }
  const reviews = await SearchReviews(query);
  return NextResponse.json(reviews);
};
