"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";

const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  useEffect(() => {
    if (pathname !== "/") {
      setQuery('');
    }
  }, [pathname]);

  return (
    <>
      {pathname === "/home" ? (
        <div className="hidden md:flex items-center bg-gray-50 rounded-full px-3">
          <IoSearch className="text-2xl text-slate-600" />
          <Input
            className=" text-sm md:w-[140px]  xl:w-[200px] border-0 bg-gray-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={placeholder}
            value={query !== null ? query : ''}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      ) : (
          null
      )}
    </>
  );
};

export default Search;
