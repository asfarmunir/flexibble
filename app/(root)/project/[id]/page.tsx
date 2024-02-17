import React from "react";
import { getProjectById } from "@/lib/database/actions/project.actions";
import ImgCarousel from "@/components/shared/ImgCarousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComments, FaHeart } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { redirect } from "next/navigation";
import Image from "next/image";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const userId: string = sessionClaims!.userId as string;

  const project = await getProjectById(id);
  if (!project) {
    redirect("/");
  }
  return (
    <>
      <div className=" min-h-screen wrapper flex flex-col gap-6 items-center  justify-start">
        <div className="flex items-center justify-between w-[100%] md:w-[90%]">
          <div>
            <div className="flex gap-2 items-center justify-center">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                {project.title}
              </h1>
              <p className="bg-slate-100 text-slate-600 rounded-md text-xs md:text-lg  px-4 capitalize">
                {project.category}
              </p>
            </div>
            <div className=" flex items-center justify-start gap-4 mt-1">
              <p className="text-sm text-slate-500">
                By{" "}
                <span className="font-semibold capitalize">
                  {project.author.username}{" "}
                </span>
              </p>
            </div>
          </div>

          <div className="mx-4 flex item-center justify-center gap-3">
            <div className="md:flex items-center justify-end gap-4 hidden">
              <div className="flex items-center justify-start gap-1">
                <FaHeart className="text-gray-400 text-lg md:text-xl hover:text-red-500 cursor-pointer" />
                <span className="text-gray-400 ">{project.rating?.length}</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <FaComments className="text-gray-400 text-lg md:text-xl hover:text-primary-500 cursor-pointer " />
                <span className="text-gray-400">
                  {project.comments?.length}
                </span>
              </div>
            </div>
            {userId === project.author._id && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDotsVertical className="text-xl font-bold" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={`/project/${project._id}/update`}>
                    <DropdownMenuItem>Update</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  {/* <DropdownMenuItem>
                </DropdownMenuItem> */}
                  <DeleteConfirmation projectId={project._id} />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <ImgCarousel project={project} />
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 w-full">
          <div className="md:w-[60%] wrapper  bg-slate-50">
            {project.description}
          </div>

          <div className="flex flex-col items-start gap-4 justify-center md:w-[40%]">
            <div className="flex flex-col md:flex-row justify-center md:justify-start w-full  items-center gap-2">
              <p className="flex text-nowrap gap-1 items-center">
                <FaGithub className=" text-lg font-semibold" /> Github:
              </p>
              <Link href={project.githubUrl}>
                <p className=" max-w-[300px] text-sm bg-slate-100 rounded-full px-4 py-2 text-nowrap  line-clamp-1">
                  {project.githubUrl}
                </p>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start w-full items-center gap-2">
              <p className="flex text-nowrap gap-1 items-center">
                <IoMdCloudUpload className=" text-xl font-semibold" />{" "}
                Deployment:
              </p>
              <Link href={project.githubUrl}>
                <p className=" max-w-[300px] text-sm bg-slate-100 rounded-full px-4 py-2 text-nowrap  line-clamp-1">
                  {project.deploymentUrl}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full wrapper">
        <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
        {/* create new comment */}
        <div className="flex items-center wrapper justify-start gap-4">
          <Image
            src={project.author.photo}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
          <input
            type="text"
            placeholder="Add a comment"
            className="w-full bg-slate-100 rounded-md px-4 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-start wrapper justify-start gap-4">
          <Image
            src={project.author.photo}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="flex items-start justify-center flex-col">
            <div className="">
              <p className="capitalize text-slate-600 font-semibold mb-1">
                {project.author.username} {project.author.lastName}
                <span className="text-slate-500 font-normal ml-2 md:ml-4 text-xs">
                  24th Aug
                </span>
              </p>
              <p className="text-slate-500 text-xs md:text-sm ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, voluptatibus sunt quod impedit ut temporibus alias
                perspiciatis deleniti quidem eaque similique? Sapiente quibusdam
                aliquam obcaecati rerum molestiae quod alias. Voluptate!
              </p>
            </div>

            <div className="flex items-start py-4 md:wrapper justify-start gap-4">
              {/* comment reply */}
              <Image
                src={project.author.photo}
                alt="user"
                width={25}
                height={25}
                className="rounded-full"
              />
              <div className="flex items-start justify-center flex-col">
                <p className="capitalize text-slate-600 font-semibold mb-1">
                  {project.author.username} {project.author.lastName}
                  <span className="text-slate-500 font-normal ml-2 md:ml-4 text-xs">
                    24th Aug
                  </span>
                </p>
                <p className="text-slate-500 text-xs md:text-sm ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempora, voluptatibus sunt quod impedit ut temporibus alias
                  perspiciatis deleniti quidem eaque similique?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
