import React from "react";
import Heading from "@/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";
import Image from "next/image";
import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic";
interface ReviewProps {
  params: { slug: string };
}

interface ReviewPageParams {
  slug: string;
}

export async function generateMetadata({ params: { slug } }: ReviewProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug: slug }));
}

const ReviewPage = async ({ params: { slug } }: ReviewProps) => {
  console.log("[ReviewPage] Rendering ", slug);
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        alt="hollow-knight"
        height="360"
        width="640"
        className="mb-2 rounded-md"
        priority
      />
      <article
        className="max-w-screen-sm prose prose-slate"
        dangerouslySetInnerHTML={{ __html: review.body }}
      ></article>
    </>
  );
};

export default ReviewPage;
