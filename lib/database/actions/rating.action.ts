"use server";
import { connectToDatabase } from "../index";
import projectModel from "../models/project.model";
import Rating from "../models/rating.model";

type createRatingTypes = {
  projectId: string;
  criticId: string;
};

export const createRating = async (rating: createRatingTypes) => {
  try {
    await connectToDatabase();
    const newRating = await Rating.create(rating);
    if (!newRating) throw new Error("Rating creation failed");

    if (newRating) {
      const project = await projectModel.findById(rating.projectId);
      if (!project) throw new Error("Project not found");
      project.rating.push(newRating);
      project.likes++;
      await project.save();
    }
    return JSON.parse(JSON.stringify(newRating));
  } catch (error) {
    console.log(error);
  }
};

export const getRatingsByProjectId = async (projectId: string) => {
  try {
    await connectToDatabase();
    const ratings = await Rating.find({ projectId }).populate("criticId");
    return JSON.parse(JSON.stringify(ratings));
  } catch (error) {
    console.log(error);
  }
};

export const getRatingsByUserId = async (
  criticId: string,
  projectId: string
) => {
  try {
    await connectToDatabase();
    const ratings = await Rating.find({ criticId, projectId }).populate(
      "criticId"
    );
    return JSON.parse(JSON.stringify(ratings));
  } catch (error) {
    console.log(error);
  }
};

export const removeRating = async (ratingId: string) => {
  try {
    await connectToDatabase();
    const rating = await Rating.findByIdAndDelete(ratingId);
    if (!rating) throw new Error("Rating not found");

    const project = await projectModel.findById(rating.projectId);
    if (!project) throw new Error("Project not found");
    project.rating = project.rating.filter(
      (r: string) => r.toString() !== ratingId
    );
    project.likes--;
    await project.save();
    return JSON.parse(JSON.stringify(rating));
  } catch (error) {
    console.log(error);
  }
};
