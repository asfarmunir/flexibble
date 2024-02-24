import { getUserById } from "@/lib/database/actions/user.actions";
import React from "react";
import { auth } from "@clerk/nextjs";
import { getProjectsByAuthor } from "@/lib/database/actions/project.actions";
import UserProfileMarkup from "@/components/shared/UserProfileMarkup";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const loggedUserId: string = sessionClaims!.userId as string;
  let userData;
  let userProjects;

  userData = await getUserById(id);
  userProjects = await getProjectsByAuthor(id);

  return <UserProfileMarkup userData={userData} userProjects={userProjects} />;
};

export default page;
