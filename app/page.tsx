import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeaturedReviews, getReviews } from "@/lib/reviews";
import Image from "next/image";

// export const dynamic = "force-dynamic";
// export const revalidate = 30; //seconds

const Homepage = async () => {
  const { reviews: featuredReviews } = await getReviews(3);
  console.log(
    "[HomePage] Rendering",
    featuredReviews.map((review) => review.slug).join(", ")
  );
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p>Only the best indie games, reviewed for you!</p>
      <ul className="flex flex-col gap-3 items-center sm:items-start">
        {featuredReviews.map((review, index) => (
          <li
            className="bg-white border rounded shadow hover:shadow-xl w-80 sm:w-full"
            key={review.slug}
          >
            <Link
              href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                src={review.image}
                alt={review.title}
                height="180"
                width="320"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
                priority={index === 0}
              />
              <div className="px-2 py-1 text-center sm:text-left">
                <h2 className="font-semibold font-orbitron">{review.title}</h2>
                <p className="pt-2">{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Homepage;
