import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body: string;
}
export const getReview = async (slug: string): Promise<Review> => {
  const url =
    "http://localhost:1337/api/reviews?" +
    qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 1, withCount: false },
      },
      { encodeValuesOnly: true }
    );
  // console.log(url);
  const response = await fetch(url);
  const { data } = await response.json();
  const { attributes } = data[0];

  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
    body: marked(attributes.body),
  };
};

export const getSlugs = async (): Promise<string[]> => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        fields: ["slug"],
        sort: ["publishedAt:desc"],
        pagination: { pageSize: 100 },
      },
      { encodeValuesOnly: true }
    );
  // console.log(url);
  const response = await fetch(url);
  const { data } = await response.json();
  return data.map((item: any) => item.attributes.slug);
};

export const getReviews = async (): Promise<Review[]> => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 6 },
        sort: ["publishedAt:desc"],
      },
      { encodeValuesOnly: true }
    );
  // console.log(url);
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
