import React from "react";
import Image from "next/image";
import Collection from "./Collection";
import { MdEmail } from "react-icons/md";
import { SiVisualstudiocode } from "react-icons/si";
import { FaStar } from "react-icons/fa";

const UserProfileMarkup = ({
  userData,
  userProjects,
}: {
  userData: any;
  userProjects: any;
}) => {
  let likes: number = 0;
  userProjects.map((project: any) => {
    likes += project.rating.length;
  });
  return (
    <div className=" wrapper flex flex-col justify-start items-start">
      <div className="flex text-center md:text-start flex-col md:flex-row items-center justify-start gap-8 wrapper border border-slate-100 bg-slate-50 rounded-2xl bg-gradient-to-b from-blue-200 to-sky-100 bg-dotted">
        <Image
          src={userData.photo}
          width={150}
          height={150}
          alt={"profile picture of " + userData.username}
          className="rounded-full "
        />
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 md:gap-2 ">
          <div className="flex flex-col items-start">
            <h4 className="h5-bold capitalize mt-2">{userData.username}</h4>
            <p className="p-regular-14 capitalize text-slate-600">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-lg font-normal text-slate-600 inline-flex items-center gap-1">
              <span className="font-semibold">
                {likes > 10 || likes === 0 ? likes : `0${likes}`}
              </span>{" "}
              <FaStar className="mb-0.5 ml-0.5 text-yellow-500" />
              Recieved
            </p>
          </div>
          <div className="flex flex-col gap-1 md:gap-3">
            <p className="p-regular-14 text-slate-600">
              {" "}
              <MdEmail className="text-primary text-xl inline mr-1" />
              {userData.email}
            </p>
            <p className="p-regular-14 text-slate-600">
              <SiVisualstudiocode className="text-primary text-lg inline mr-2" />
              Project Added:{" "}
              <span className="font-semibold text-lg text-primary-500 ">
                {userProjects.length > 10 || userProjects.length === 0
                  ? userProjects.length
                  : `0${userProjects.length}`}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col  items-center  justify-center lg:justify-start w-full">
        <h3 className="h3-bold my-4">Projects</h3>

        <Collection
          data={userProjects}
          emptyTitle="No Projects"
          emptyStateSubtext={`${userData.username} has not added any projects`}
        />
      </div>
    </div>
  );
};

export default UserProfileMarkup;
