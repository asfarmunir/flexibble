import React from "react";
import { Badge } from "@/components/ui/badge";
import { categoryFilters } from "@/lib/constants";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { getAllProjects } from "@/lib/database/actions/project.actions";
import Collection from "@/components/shared/Collection";
import { RiMenu5Fill } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// type project = {
//   data: any;
//   totalPages: number;
// };
const page = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const projects = await getAllProjects({ query: searchText, limit: 6, page });

  return (
    <div className="w-full wrapper flex flex-col min-h-svh">
      <div className=" flex gap-2 items-center mb-3  ">
        <FaAngleLeft className="text-primary-500 text-sm" />
        <div className="max-w-screen-xl overflow-auto flex gap-3 items-center scroll-smooth scrollbar-none">
          {categoryFilters.map((category, index) => (
            <Badge
              variant="default"
              key={index}
              className=" bg-primary-100 text-nowrap cursor-pointer "
            >
              {category}
            </Badge>
          ))}
        </div>

        <FaAngleRight className="text-primary-500 text-sm" />
      </div>
      <div className="flex items-start wrapper flex-col justify-center">
        <div className="flex items-center justify-between w-full">
          <h3 className="h3-bold">Projects</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex items-center justify-center gap-2 md:mr-12 font-light border rounded-3xl border-slate-200 px-3 text-sm py-2 text-slate-600  ">
              <RiMenu5Fill />
              Filters
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem>Top Rated</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Most Recent</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 flex flex-col  items-center lg:items-start justify-center lg:justify-start w-full">
          <Collection
            data={projects?.data}
            totalPages={projects?.totalPages}
            page={page}
            limit={6}
            emptyTitle="No projects found"
            emptyStateSubtext="Try a different search"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
