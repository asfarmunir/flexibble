"use server";

import Comment from "../models/comment.model";
import { connectToDatabase } from "../index";

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
    return JSON.parse(JSON.stringify(newComment));
  } catch (error) {
    console.log(error);
  }
};
