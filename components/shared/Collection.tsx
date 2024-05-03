'use client'
import { IProject } from "@/lib/database/models/project.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import {  motion } from "framer-motion";
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
        <motion.div
          
          
        className="flex flex-col justify-center items-center gap-10"          >
            
          <div className=" grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((project) => {
              const hasOrderLink = collectionType === "projects_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <motion.div
                  key={project._id}
                  initial={{ scale: 1, opacity:0, y: 60}}
          transition={{
            duration: 0.55, delay: 0.1, type: "keyframes", stiffness: 100, damping: 20, 
            animation: "spring", ease: "easeInOut",
          }}
          whileInView={{
            scale: 1, opacity: 1, y: 0
          }
          }
                  className="flex justify-center" >
                  <Card
                    project={project}
                  />
               
                </motion.div>
                
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </motion.div>
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
