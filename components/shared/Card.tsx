"use client";
import { IProject } from "@/lib/database/models/project.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaComments } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
// import "./card.css";
// import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  project: IProject;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ project, hasOrderLink, hidePrice }: CardProps) => {
  return (
    <div
      id="main_card"
      className="flex flex-col max-w-[400px] justify-center items-center group relative shadow-md hover:shadow-lg rounded-lg transition duration-300  "
    >
      <div className="flex items-center justify-between w-full p-4">
        <h2 className="text-xl font-semibold capitalize ">{project.title}</h2>
        <p className=" bg-slate-100 text-slate-500 px-3 py-1 rounded text-xs">
          {project.category}
        </p>
      </div>
      <Link id="image" href={`/project/${project._id}`}>
        <div className="">
          <Image
            src={project.images[0]}
            alt={project.title}
            width={350}
            height={350}
            priority
            className=" flex-grow h-[160px] md:h-[200px] object-center bg-contain  object-contain"
          />
        </div>
      </Link>
      <p
        id="text"
        className=" hidden text-lg font-semibold px-4 py-2 rounded-full border"
      >
        Check out
      </p>
      <div className="flex items-center justify-between w-full p-4">
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
              {project.rating?.length}
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
    </div>
  );
};

export default Card;
