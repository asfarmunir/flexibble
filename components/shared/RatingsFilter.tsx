"use client";
import { categoryFilters } from "@/lib/constants";
import React from "react";
import { Badge } from "../ui/badge";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

const CategoryFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ratingsFilter = (filter: string) => {
    let newUrl = "";
    if (filter === "ratings") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "ratings",
        value: 'true',
      });
    } else if (filter === "recent") {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["ratings"],
      });
      }
    else if (filter === "all") {
        newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["ratings"],
        });
        }
    router.push(newUrl, { scroll: false });
    };
    
    
    return (
        <div className="flex flex-col w-full text-start items-center justify-center gap-1 ">
              <p onClick={()=>ratingsFilter('ratings')} className="text-sm pl-2 w-full  mt-0.5  cursor-default hover:bg-slate-100 py-1 border-b pb-1">Top Rated</p>
              <p onClick={()=>ratingsFilter('recent')} className="text-sm pl-2 w-full  mt-0.5  cursor-default hover:bg-slate-100 py-1 border-b pb-1">Most Recent</p>
              <p onClick={()=>ratingsFilter('all')} className="text-sm pl-2 w-full  mt-0.5  cursor-default hover:bg-slate-100 py-1 border-b pb-1">All  </p>
             
        </div>
    
  );
};

export default CategoryFilters;
