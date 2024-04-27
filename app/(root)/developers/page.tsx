import { getAllUsers } from "@/lib/database/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoIosContact, IoMdMailOpen } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { IoPerson } from "react-icons/io5";
import { TopDevelopers } from '@/components/shared/TopDevelopers'

import Link from "next/link";
const page = async () => {
  const users  = await getAllUsers();

  function getRandomNumber() {
    return Math.floor(Math.random() * 7) + 1;
  }
  return (
    <div className="flex items-center justify-center  flex-col wrapper">
      <TopDevelopers developers={users} />

      <h3 className="h3-bold mt-20">Developers</h3>
      <p className="p-regular-14 text-slate-600 text-center mb-4">
        Meet our talented developers behind these amazing products
      </p>
      <div className=" wrapper grid w-full grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10">
        {users.map((user: IUser) => {
          const randomNumber = getRandomNumber();
          return (
            <div
              key={user._id}
              className="flex flex-col justify-start items-center shadow-md rounded-xl "
            >
              <div
                style={{
                  backgroundImage: `url('images/bg${randomNumber}.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100px",
                  borderRadius: "14px 14px 0 0",
                }}
              ></div>
              <div className="flex flex-col items-center w-full px-4">
                <Image
                  src={user.photo}
                  width={80}
                  height={80}
                  priority
                  alt={"profile picture of " + user.username}
                  className="rounded-full -mt-11 "
                />
                <div className="text-center">
                  <h4 className="h5-bold capitalize mt-2">{user.username}</h4>
                  <p className="p-regular-14 text-slate-600">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <Separator className=" w-full my-4" />
                <div className="flex items-center justify-center mt-1 mb-5 gap-3">
                  <Link href={`/profile/${user._id}`}>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="btn-primary flex flex-col text-xs items-center justify-center text-primary "
                    >
                      <IoPerson className="text-3xl mb-0.5" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="btn-primary flex flex-col text-xs items-center justify-center text-primary "
                  >
                    <IoMdMailOpen className="text-3xl" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
