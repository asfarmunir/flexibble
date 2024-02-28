"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";
import { addUserPosition } from "@/lib/database/actions/user.actions";
import { useRouter } from "next/navigation";
import Router from "next/router";

const UserPosition = ({ userId }: { userId: string }) => {
  const [position, setPosition] = React.useState("");
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger className="mt-3 text-primary font-semibold text-xs flex gap-1 items-center">
        Add Position <IoMdAddCircleOutline className="text-sm" />
      </DialogTrigger>
      <DialogContent className="bg-white py-14 mx-6">
        <DialogHeader>
          <DialogTitle className="text-sm md:text-lg">
            Add your position to improve your profile
          </DialogTitle>
          <DialogDescription className="mb-3">
            select your position from the list of available positions
            <Select
              onValueChange={(value: string) => {
                setPosition(value);
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="position" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px]  focus:outline-none focus:ring-0 ">
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>
                <SelectItem value="Full Stack Developer">
                  Full Stack Developer
                </SelectItem>
                <SelectItem value="Mern Stack Developer">
                  Mern Stack Developer
                </SelectItem>
                <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                <SelectItem value="Machine Learning Engineer">
                  Machine Learning Engineer
                </SelectItem>
                <SelectItem value="Cybersecurity Analyst">
                  Cybersecurity Analyst
                </SelectItem>
                <SelectItem value="Cloud Engineer">Cloud Engineer</SelectItem>
                <SelectItem value="Software Engineer">
                  Software Engineer
                </SelectItem>
                <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                <SelectItem value="Mobile App Developer">
                  Mobile App Developer
                </SelectItem>
                <SelectItem value="Game Developer">Game Developer</SelectItem>
                <SelectItem value="Network Engineer">
                  Network Engineer
                </SelectItem>
                <SelectItem value="IoT Developer">IoT Developer</SelectItem>
                <SelectItem value="Blockchain Developer">
                  Blockchain Developer
                </SelectItem>
                <SelectItem value="Quality Assurance Engineer">
                  Quality Assurance Engineer
                </SelectItem>
                <SelectItem value="Database Administrator">
                  Database Administrator
                </SelectItem>
                <SelectItem value="Systems Administrator">
                  Systems Administrator
                </SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
                <SelectItem value="Business Analyst">
                  Business Analyst
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                toast.promise(addUserPosition(userId, position), {
                  loading: "Adding position",
                  success: "Position added",
                  error: "Failed to add position",
                });
                window.location.reload();
              }}
              className="mt-4"
              disabled={position === ""}
            >
              Add Position
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserPosition;
