import Link from "next/link";
import React from "react";
import Heading from "@/components/Heading";
import { Review, getReviews } from "@/lib/reviews";

export const metadata = {
  title: "Reviews",
};

const ReviewsPage = async () => {
  const reviews = await getReviews();
  // console.log("Reviews", reviews);
  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review: Review) => (
          <li
            className="bg-white border w-80 rounded shadow hover:shadow-xl"
            key={review.slug}
          >
            <Link href={`/reviews/${review.slug}`}>
              <img
                src={review.image}
                alt={review.title}
                height="180"
                width="320"
                className="rounded-t"
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

export default ReviewsPage;
