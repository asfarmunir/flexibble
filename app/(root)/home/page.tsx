import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { getAllProjects } from "@/lib/database/actions/project.actions";
import Collection from "@/components/shared/Collection";
import { RiMenu5Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategoryFilters from "@/components/shared/CategoryFilters";
import { FaCaretRight } from "react-icons/fa";
import RemoveQuery from "@/components/shared/RemoveQuery";
import RatingFilter from "@/components/shared/RatingsFilter";

type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const ratings = (searchParams?.ratings as string) || "";
  const projects = await getAllProjects({
    query: searchText,
    limit: 9,
    page,
    category,
    ratings,
  });
  // console.log(projects);

  return (
    <div className="w-full wrapper flex flex-col min-h-svh">
      <div className=" flex gap-2 items-center mb-3  ">
        <FaAngleLeft className="text-primary-500 text-sm" />
        <CategoryFilters />
        <FaAngleRight className="text-primary-500 text-sm" />
      </div>
      <div className="flex items-start wrapper flex-col justify-center">
        <div className="flex items-start md:items-center justify-between w-full">
          <div className="flex flex-col  md:flex-row items-start md:items-center justify-center md:gap-4">
            <h3 className="h3-bold">Projects</h3>

            <div className="flex items-center justify-center gap-2">
              {category && (
                <p className="text-xs md:text-sm font-semibold text-primary mt-1 flex items-center">
                  <FaCaretRight className="text-primary text-lg" />
                  {category}
                </p>
              )}
              {
                searchText !== "" && (
                  <RemoveQuery searchText={searchText} />
                )
                
              }
              {
                ratings === "true" && (
                  <p className=" bg-yellow-100 inline-flex items-center gap-1 text-sm px-5 py-1 rounded-full text-yellow-600 mt-1">
                    <FaStar className="text-orange-400 mb-0.5" />
                    Top Rated
                  </p>
                )
              }

               
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex items-center justify-center gap-2 md:mr-12 font-light border rounded-3xl border-slate-200 px-3 text-sm py-2 text-slate-600  ">
              <RiMenu5Fill />
              Filters
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <RatingFilter />
            
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 flex flex-col  items-center lg:items-start justify-center lg:justify-start w-full">
          <Collection
            data={projects?.data}
            totalPages={projects?.totalPages}
            page={page}
            limit={9}
            emptyTitle="No projects found"
            emptyStateSubtext="Try a different search"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
