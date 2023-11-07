import React from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { Review, getReviews } from "@/lib/reviews";
import PaginationBar from "@/components/PaginationBar";

// export const dynamic = "force-dynamic";
// export const revalidate = 30; //seconds

interface ReviewsPageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata = {
  title: "Reviews",
};
const PAGE_SIZE = 6;

const ReviewsPage = async ({ searchParams }: ReviewsPageProps) => {
  const page = parsePageParams(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  console.log(
    "[ReviewsPage] Rendering",
    reviews.map((review) => review.slug).join(", ")
  );
  return (
    <>
      <Heading>Reviews</Heading>
      <PaginationBar page={page} pageCount={pageCount} href="/reviews" />
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review: Review, index) => (
          <li
            className="bg-white border w-80 rounded shadow hover:shadow-xl"
            key={review.slug}
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt={review.title}
                height="180"
                width="320"
                className="rounded-t"
                priority={index === 0}
              />
              <h2 className="font-semibold font-orbitron py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const parsePageParams = (params: string | undefined): number => {
  if (params) {
    const page = parseInt(params);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
};

export default ReviewsPage;
