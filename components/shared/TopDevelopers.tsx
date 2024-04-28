"use client";
import React from "react";
import { BackgroundGradient } from "@/components/shared/BackgroundGradient";
import { IUser } from "@/lib/database/models/user.model";
import { AnimatedTooltip } from "./AnimatedTooltip";
import Confetti from 'react-confetti'


export function TopDevelopers({ developers }: { developers: IUser[] }) {
    const data = developers.map((developer) => {
        return {
            id: developer._id as unknown as number,
            name: developer.username,
            position: developer.position,
            image: developer.photo,
        };
    });
  return (
    <div className="mt-4 w-full ">
      <BackgroundGradient className="rounded-[22px] overflow-hidden w-full flex flex-col md:flex-row items-center justify-evenly gap-6 md:gap-0  p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <Confetti
          className="w-full"
          height={250}
          opacity={0.18}
          numberOfPieces={100}
          friction={0.94}
          recycle={false}
    />
              <div className=" z-50">
                     <p className="md:text-4xl md:max-w-xl font-bold sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
         kudos to our top developers of the month.
        </p>

        <p className="text-sm text-neutral-500 max-w-xl dark:text-neutral-400">
            We appreciate the hard work and dedication of our top developers. They have been consistent in delivering quality products to our clients.
        </p>
        <button className="rounded-full pl-4 pr-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          congrats to all
        </button>
              </div>
              <div className="flex items-center justify-center">
                  
                <AnimatedTooltip items={data} />
              </div>
              
     
      </BackgroundGradient>
    </div>
  );
}
