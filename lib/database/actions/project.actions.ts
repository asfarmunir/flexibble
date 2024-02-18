"use server";

import Project, { IProject } from "../models/project.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { createProjectTypes, updateProjectTypes } from "@/types";
import { connectToDatabase } from "../index";

export const createProject = async ({
  authorId,
  project,
  path,
}: createProjectTypes) => {
  try {
    await connectToDatabase();
    const user = await User.findById(authorId);
    if (!user) throw new Error("User not found");
    const newProject = await Project.create({
      ...project,
      author: authorId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newProject));
  } catch (error) {
    console.log(error);
  }
};

export const getProjects = async () => {
  try {
    await connectToDatabase();
    const projects = await Project.find().populate("author");
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    await connectToDatabase();
    const project = await Project.findById(id).populate("author");

    if (!project) throw new Error("Project not found");
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    return error;
  }
};

export const updateProject = async ({
  projectId,
  project,
  path,
}: updateProjectTypes) => {
  try {
    await connectToDatabase();
    const updatedProject = await Project.findByIdAndUpdate(projectId, project, {
      new: true,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedProject));
  } catch (error) {
    console.log(error);
    return error;
  }
};

type removeProjectTypes = {
  projectId: string;
  path: string;
};

export const removeProject = async ({
  projectId,
  path,
}: removeProjectTypes) => {
  try {
    await connectToDatabase();
    const project = await Project.findByIdAndDelete(projectId);
    if (project) revalidatePath(path);
  } catch (error) {
    console.log(error);
    return error;
  }
};
