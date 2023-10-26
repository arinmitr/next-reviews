import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";

const Homepage = async () => {
  const featuredReview = await getFeaturedReview();
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p>Only the best indie games, reviewed for you!</p>
      <div className="bg-white border rounded shadow hover:shadow-xl w-80 sm:w-full">
        <Link
          href={`/reviews/${featuredReview.slug}`}
          className="flex flex-col sm:flex-row"
        >
          <img
            src={featuredReview.image}
            alt={featuredReview.title}
            height="180"
            width="320"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">
            {featuredReview.title}
          </h2>
        </Link>
      </div>
    </>
  );
};

export default Homepage;
