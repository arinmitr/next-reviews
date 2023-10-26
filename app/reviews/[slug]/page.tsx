import React from "react";
import Heading from "@/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";

interface ReviewProps {
  params: { slug: string };
}

interface ReviewPageParams {
  slug: string;
}

export async function generateMetadata({ params: { slug } }: ReviewProps) {
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug: slug }));
}

const ReviewPage = async ({ params: { slug } }: ReviewProps) => {
  const review = await getReview(slug);
  console.log("[Rendering ]", slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <img
        src={review.image}
        alt="hollow-knight"
        height="360"
        width="640"
        className="mb-2 rounded-md"
      />
      <article
        className="max-w-screen-sm prose prose-slate"
        dangerouslySetInnerHTML={{ __html: review.body }}
      ></article>
    </>
  );
};

export default ReviewPage;
