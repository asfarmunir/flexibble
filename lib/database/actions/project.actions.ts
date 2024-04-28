"use server";

import Project from "../models/project.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { createProjectTypes, updateProjectTypes } from "@/types";
import { connectToDatabase } from "../index";
import { Comment } from "../models/comment.model";
import ratingModel from "../models/rating.model";

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
      createdAt: new Date(),
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newProject));
  } catch (error) {
    console.log(error);
  }
};

type getAllProjectsTypes = {
  query: string;
  limit: number;
  page: number;
  category: string;
  ratings: string;
};

export async function getAllProjects({
  query,
  limit = 9,
  page,
  category,
  ratings
}: getAllProjectsTypes): Promise<{ data: any[]; totalPages: number }> {
  try {
    await connectToDatabase();
    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const skipAmount = (Number(page) - 1) * limit;

    const conditions = {
      $and: [titleCondition, category ? { category: { $eq: category } } : {},],
      
    };

    // Condition to filter projects with non-empty ratings arrays
    // const ratingLengthCondition = { rating: { $exists: true, $not: { $size: 0 } } };
let sortOptions = {}; // Default empty sort options

    if (ratings === "true") {
      // If ratings is true, sort by likes in descending order
      sortOptions = { likes: -1 };
    }
   
    const projects = await Project.find({ ...conditions })
      .skip(skipAmount)
      .limit(limit)
      .populate("author")
      .sort(sortOptions) // Sort based on sortOptions


    const projectCount = await Project.countDocuments({ ...titleCondition });

    return {
      data: JSON.parse(JSON.stringify(projects)),
      totalPages: Math.ceil(projectCount / limit),
    };
  } catch (error) {
    throw error;
  }
}


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
    if (project) 
    {
      await Comment.deleteMany({ postId: projectId });
      await ratingModel.deleteMany({ projectId: projectId });
      revalidatePath(path);
      }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProjectsByAuthor = async (authorId: string) => {
  try {
    await connectToDatabase();
    const projects = await Project.find({ author: authorId }).populate(
      "author"
    );
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const getProjectsCount = async () => {
  try {
    await connectToDatabase();
     const projectCount = await Project.countDocuments();
    return JSON.parse(JSON.stringify(projectCount));
    
  } catch (error) {
    console.log(error);
    
  }
}