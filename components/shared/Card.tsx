"use client";
import { IProject } from "@/lib/database/models/project.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaComments } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { CardBody, CardContainer, CardItem } from "./3dCard";
// import "./card.css";
// import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  project: IProject;
};

const Card = ({ project }: CardProps) => {
  return (
       <CardContainer className="inter-var">
      <CardBody className="bg-white relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-[370px] sm:w-[30rem] h-auto rounded-xl  px-6 pt-4 border  ">
        <CardItem
          translateZ="50"
          className="text-lg flex items-center justify-between w-full font-bold text-neutral-600 dark:text-white"
              >
                        <h2 className=" text-black font-semibold"> { project.title}</h2>
<p className=" bg-slate-100 text-slate-500 font-thin px-3 py-1 rounded text-xs">
        {project.category}
                        </p>        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
        <Link href={`/project/${project._id}`} className=" cursor-pointer">
          
          <Image
            src={project.images[0]}
            alt={project.title}
            width={350}
            height={350}
            priority
            className="h-48 w-full object-contain object-center rounded-md group-hover/card:shadow-xl"
          />
        </Link>
        </CardItem>
        
        <div className="flex items-center justify-between w-full p-4 mt-3">
        <div className="flex gap-2 items-center">
          <Image
            src={project.author.photo}
            alt={project.author.username}
            width={25}
            height={25}
            className="rounded-full"
          />
          <h2 className=" capitalize text-slate-600">
            {project.author.username}
          </h2>
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center justify-start gap-1">
            <FaHeart className="text-gray-300 text-sm hover:text-red-500 cursor-pointer" />
            <span className="text-gray-300 text-sm">
              {project.likes}
            </span>
          </div>
          <div className="flex items-center justify-start gap-1">
            <FaComments className="text-gray-300 hover:text-primary-500 cursor-pointer " />
            <span className="text-gray-300 text-sm">
              {project.comments?.length}
            </span>
          </div>
        </div>
      </div>
      </CardBody>
    </CardContainer>
    // <div
    //   id="main_card"
    //   className="flex flex-col max-w-[400px] justify-center items-center group relative shadow-md hover:shadow-lg rounded-lg transition duration-300  "
    // >
    //   <div className="flex items-center justify-between w-full p-4">
    //     <h2 className="text-xl font-semibold capitalize ">{project.title}</h2>
    //     <p className=" bg-slate-100 text-slate-500 px-3 py-1 rounded text-xs">
    //       {project.category}
    //     </p>
    //   </div>
    //   <Link id="image" href={`/project/${project._id}`}>
    //     <div className="">
    //       <Image
    //         src={project.images[0]}
    //         alt={project.title}
    //         width={350}
    //         height={350}
    //         priority
    //         className=" flex-grow h-[160px] md:h-[200px] object-center bg-contain  object-contain"
    //       />
    //     </div>
    //   </Link>
    //   <p
    //     id="text"
    //     className=" hidden text-lg font-semibold px-4 py-2 rounded-full border"
    //   >
    //     Check out
    //   </p>
    //   <div className="flex items-center justify-between w-full p-4">
    //     <div className="flex gap-2 items-center">
    //       <Image
    //         src={project.author.photo}
    //         alt={project.author.username}
    //         width={25}
    //         height={25}
    //         className="rounded-full"
    //       />
    //       <h2 className=" capitalize text-slate-600">
    //         {project.author.username}
    //       </h2>
    //     </div>
    //     <div className="flex items-center justify-end gap-4">
    //       <div className="flex items-center justify-start gap-1">
    //         <FaHeart className="text-gray-300 text-sm hover:text-red-500 cursor-pointer" />
    //         <span className="text-gray-300 text-sm">
    //           {project.rating?.length}
    //         </span>
    //       </div>
    //       <div className="flex items-center justify-start gap-1">
    //         <FaComments className="text-gray-300 hover:text-primary-500 cursor-pointer " />
    //         <span className="text-gray-300 text-sm">
    //           {project.comments?.length}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
