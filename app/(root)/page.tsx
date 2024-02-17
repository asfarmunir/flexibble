import React from "react";
import { Badge } from "@/components/ui/badge";
import { categoryFilters } from "@/lib/constants";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { getProjects } from "@/lib/database/actions/project.actions";
import Collection from "@/components/shared/Collection";

const page = async () => {
  const projects = await getProjects();

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
        <div className="flex items-center justify-between">
          <h3 className="h3-bold">Projects</h3>
        </div>
        <div className="mt-6 flex flex-col  items-center lg:items-start justify-center lg:justify-start w-full">
          <Collection data={projects} />
        </div>
      </div>
    </div>
  );
};

export default page;
