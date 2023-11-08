import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";
export const CACHE_TAG_REVIEWS = "reviews";
export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
}
export type SearchableReview = Pick<Review, "slug" | "title">;
export interface PaginatedReviews {
  reviews: Review[];
  pageCount: number;
}

export interface FullReview extends Review {
  body: string;
}

interface CmsItem {
  id: number;
  attributes: any;
}

export const getReview = async (slug: string): Promise<FullReview | null> => {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;
  }
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
};

export async function SearchReviews(
  query: string
): Promise<SearchableReview[]> {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });
  return data.map(({ attributes }: any) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}
export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map((item: CmsItem) => item.attributes.slug);
}

export const getReviews = async (
  pageSize: number,
  page?: number
): Promise<PaginatedReviews> => {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  });
  return { reviews: data.map(toReview), pageCount: meta.pagination.pageCount };
};

export const getFeaturedReviews = async (): Promise<Review[]> => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 3 },
        sort: ["publishedAt:desc"],
      },
      { encodeValuesOnly: true }
    );
  const response = await fetch(url);
  const { data } = await response.json();

  return data.map(({ attributes }: any) => ({
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  }));
};

const fetchReviews = async (parameters: any) => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  // console.log('[fetchReviews]:', url);
  const response = await fetch(url, {
    next: {
      // revalidate: 30, //seconds
      tags: [CACHE_TAG_REVIEWS],
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
};

const toReview = (item: CmsItem): Review => {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: new URL(attributes.image.data.attributes.url, CMS_URL).href,
  };
};
