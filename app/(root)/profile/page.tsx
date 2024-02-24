import { getUserById } from "@/lib/database/actions/user.actions";
import React from "react";
import { auth } from "@clerk/nextjs";
import { getProjectsByAuthor } from "@/lib/database/actions/project.actions";
import UserProfileMarkup from "@/components/shared/UserProfileMarkup";

const page = async () => {
  const { sessionClaims } = auth();
  const loggedUserId: string = sessionClaims!.userId as string;
  let userData;
  let userProjects;

  userData = await getUserById(loggedUserId);
  userProjects = await getProjectsByAuthor(loggedUserId);

  return <UserProfileMarkup userData={userData} userProjects={userProjects} />;
};

export default page;
