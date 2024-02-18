"use server";

import { Comment } from "../models/comment.model";
import { connectToDatabase } from "../index";
import projectModel from "../models/project.model";

type createCommentTypes = {
  text: string;
  postId: string;
  criticId: string;
  createdAt: Date;
};

export const createComment = async (comment: createCommentTypes) => {
  try {
    await connectToDatabase();
    const newComment = await Comment.create(comment);
    if (!newComment) throw new Error("Comment creation failed");

    if (newComment) {
      const project = await projectModel.findById(comment.postId);
      if (!project) throw new Error("Project not found");
      project.comments.push(newComment._id);
      await project.save();
    }
    return JSON.parse(JSON.stringify(newComment));
  } catch (error) {
    console.log(error);
  }
};
export const getCommentsofProject = async (id: string) => {
  try {
    await connectToDatabase();
    const comments = await Comment.find({ postId: id })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate("criticId");
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteComment = async (id: string) => {
  try {
    await connectToDatabase();
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) throw new Error("Comment not found");
    if (comment) {
      const project = await projectModel.findById(comment.postId);
      if (!project) throw new Error("Project not found");
      project.comments = project.comments.filter(
        (commentId: string) => commentId.toString() !== id
      );
      await project.save();
    }
    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    console.log(error);
    return error;
  }
};
