import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { RiMenu2Fill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Navlinks from "./Navlinks";

const Navbar = () => {
  return (
    <nav className="navbar flex  items-center justify-between gap-8">
      <div className="flex items-center justify-center gap-3">
        <div className="block  lg:hidden ">
          <Sheet>
            <SheetTrigger>
              <RiMenu2Fill className="text-2xl font-bold mt-2" />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex justify-between flex-col bg-white"
            >
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src={"/logo-purple.svg"}
                    alt="logo"
                    width={100}
                    height={100}
                    className="mb-4"
                  />
                </SheetTitle>
                <Separator />

                <div className=" pt-6">
                  <Navlinks />
                </div>
              </SheetHeader>
              <SheetDescription className="">
                <div className="flex  text-center flex-col-reverse gap-2 md:flex-row md:justify-between items-center justify-center text-slate-500">
                  <p className="text-xs font-semibold text-primary-100">
                    @2024 Asfar Munir Asfi.{" "}
                    <span className="font-normal text-slate-500">
                      All Rights Reserved
                    </span>
                  </p>
                  <p className="text-xs">
                    <b>1937 </b>Projects Submitted
                  </p>
                </div>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>

        <Image
          src="/logo.svg"
          width={100}
          height={35}
          alt="Logo"
          className=" w-[80px] md:w-[100px] "
        />
        <div className=" hidden lg:block mx-5">
          <Navlinks />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="flex items-center bg-gray-50 rounded-full px-3">
          <IoSearch className="text-2xl text-slate-600" />
          <Input
            className=" text-sm  max-w-md border-0 bg-gray-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="search project.."
          />
        </div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button
            asChild
            className="rounded-full bg-primary hover:bg-primary-100 px-4  lg:px-6  focus:outline:primary-100 "
            size="sm"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
