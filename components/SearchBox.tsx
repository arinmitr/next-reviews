"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";
import { SearchableReview } from "@/lib/reviews";
import { useDebounce } from "@/app/hooks/useDebounce";

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [reviews, setReviews] = useState<SearchableReview[]>([]);
  const debouncedQuery = useDebounce(query, 800);
  const handleChange = (review: SearchableReview): void => {
    router.push(`/reviews/${review.slug}`);
  };

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = "/api/search?query=" + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, {
          signal: controller.signal,
        });
        const data = await response.json();
        setReviews(data);
      })();
      return () => {
        controller.abort();
      };
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search..."
          value={query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          className="rounded border px-2 py-1 w-full"
        />
        <Combobox.Options className="absolute bg-white w-full">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default SearchBox;
