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
import Comments from "@/components/shared/Comments";
import { getUserById } from "@/lib/database/actions/user.actions";
import CreateRatings from "@/components/shared/CreateRatings";
import { IProject } from "@/lib/database/models/project.model";
import { getCommentsofProject } from "@/lib/database/actions/comment.actions";
import { IoOpenOutline } from "react-icons/io5";
import { HiArrowUpRight } from "react-icons/hi2";


const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const userId: string = sessionClaims!.userId as string;
  const project: IProject = await getProjectById(id);
  
  const comments = await getCommentsofProject(project._id);
  if (!project) {
    redirect("/home");
  }

  const currentUser = await getUserById(userId);

  return (
    <>
      <div className=" min-h-screen wrapper flex flex-col gap-6 items-center  justify-start">
        <div className="flex items-center justify-between w-[100%] md:w-[90%]">
          <div>
            <div className="flex gap-2 items-center justify-center">
              <h1 className="text-2xl md:text-4xl capitalize font-bold text-gray-800">
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
              <CreateRatings
                projectId={project._id}
                criticId={userId}
                projectAuthorId={project.author._id}
              />
              <Link href={"#comments"}>
                <div className="flex items-center justify-start gap-1">
                  <FaComments className="text-gray-400 text-lg md:text-xl hover:text-primary-500 cursor-pointer " />
                  <span className="text-gray-400">
                    {project.comments?.length}
                  </span>
                </div>
              </Link>
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
        <div className="flex flex-col-reverse  md:flex-row items-start justify-between gap-4 w-full">
          <div className="md:w-[60%] wrapper shadow-sm bg-slate-50 py-5">
            <p className="text-xl font-thin text-slate-600 capitalize mb-3 mt-3">Presenting {"  "}{"  "}
              <span className="font-bold ml-1 text-3xl text-black">{ project.title}</span>
            </p>
            <pre
              className="text-slate-600 font-thin text-justify font-serif md:px-4 py-3"
              style={{ whiteSpace: "pre-wrap" }}
            >

            {project.description}
            </pre>
          </div>

          <div className="flex flex-col shadow-sm items-center gap-4 p-4 py-8 justify-center md:w-[40%] bg-slate-50">
            <div className="flex flex-col  justify-center md:justify-start w-full  items-center gap-2">
              <p className="flex text-xl font-bold text-nowrap gap-1 items-center">
                <FaGithub className=" text-2xl font-bold" /> Github
              </p>
              {project.githubUrl === "" && <p className="text-sm font-light text-slate-600">No github link provided</p>}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank">
                  <div className="flex items-center bg-slate-100  justify-center">
 <p className="  max-w-[200px] md:max-w-[300px]   rounded-md px-4 py-2 mr-2 text-nowrap  line-clamp-1 text-slate-600">
                    {project.githubUrl}
                  </p>
                  <span className=" border-slate-500 px-2 py-1 border-l">
<IoOpenOutline />
                  </span>
                  </div>
                 
                </Link>
              )}
            </div>
             <div className="flex flex-col  justify-center md:justify-start w-full  items-center gap-2">
              <p className="flex text-xl font-bold text-nowrap gap-1 items-center">
                <IoMdCloudUpload className=" text-2xl font-bold" /> Deployment
              </p>
              {project.deploymentUrl === "" && <p className="text-sm font-light text-slate-600">Deployment Coming Soon</p>}
              {project.deploymentUrl && (
                <Link href={project.deploymentUrl} target="_blank">
                  <div className="flex items-center bg-slate-100  justify-center">
 <p className="  max-w-[200px] md:max-w-[300px]   rounded-md px-4 py-2 mr-2 text-nowrap  line-clamp-1 text-slate-600">
                    {project.deploymentUrl}
                  </p>
                  <span className=" border-slate-500 px-2 py-1 border-l">
<IoOpenOutline />
                  </span>
                  </div>
                 
                </Link>
              )}
            </div>
            <div className="bg-white rounded p-3 shadow w-full">
              <div className=" w-full  rounded-lg p-4 flex flex-col items-start justify-center ">
              <h2 className="font-bold text-2xl border-b border-slate-300 w-full pb-1 mb-5 ">About Author</h2>

                <div className="flex items-center w-full justify-center gap-6">
                  <Image src={project.author.photo} alt="pfp" width={80} height={80} className="rounded-full" />
                  <div className="flex items-start justify-center flex-col">
                    <p className="font-bold  text-primary capitalize  text-xl">{ project.author.username}</p>
                    <p className=" text-slate-600  capitalize">{project.author.position}</p>
                    <Link href={`/profile/${project.author._id}`} className="font-thin inline-flex items-center gap-0.5 justify-center mt-2 text-blue-600 text-sm">
                      visit profile <HiArrowUpRight />

                    </Link>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
      <div id="comments">
        <Comments
          project={project}
          currentUser={currentUser}
          preRenderedComments={comments}
        />
      </div>
    </>
  );
};

export default page;
