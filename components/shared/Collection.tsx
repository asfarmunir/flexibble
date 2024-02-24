import { IProject } from "@/lib/database/models/project.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import Image from "next/image";
type CollectionProps = {
  data: IProject[];
  emptyTitle?: string;
  emptyStateSubtext?: string;
  limit?: number;
  page?: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "projects_Organized" | "My_Tickets" | "All_projects";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page = 1,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col justify-center items-center gap-10">
          {/* <ul className=" w-full flex items-center justify-start flex-grow  gap-6 gap-y-7 flex-wrap"> */}
          <ul className=" grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((project) => {
              const hasOrderLink = collectionType === "projects_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={project._id} className="flex justify-center">
                  <Card
                    project={project}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-slate-50 py-28 text-center">
          <Image
            src={"/images/notFound.png"}
            width={160}
            height={150}
            alt="notFound"
          />
          <h3 className="p-bold-20 md:h5-bold text-slate-500">{emptyTitle}</h3>
          <p className="p-regular-14 text-slate-400">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
