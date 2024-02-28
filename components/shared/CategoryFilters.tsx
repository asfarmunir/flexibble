"use client";
import { categoryFilters } from "@/lib/constants";
import React from "react";
import { Badge } from "../ui/badge";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

const CategoryFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFilter = (category: string) => {
    console.log(category);
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="max-w-screen-xl overflow-auto flex gap-3 items-center scroll-smooth scrollbar-none">
      {categoryFilters.map((category: string, index) => (
        <Badge
          variant="default"
          key={index}
          className={` ${
            category === "All" && "px-5"
          } bg-primary-100 text-nowrap cursor-pointer`}
          onClick={() => categoryFilter(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default CategoryFilters;
