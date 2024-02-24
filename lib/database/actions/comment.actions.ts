"use server";

import { Comment, Reply } from "../models/comment.model";
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
      .populate("criticId")
      .populate("replies");
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
      const reply = await Reply.deleteMany({ commentId: id });
    }
    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    console.log(error);
    return error;
  }
};

type createReplyTypes = {
  text: string;
  commentId: string;
  criticId: {
    username: string;
    photo: string;
  };
  createdAt: Date;
};

export const createReply = async (reply: createReplyTypes) => {
  try {
    await connectToDatabase();
    const newReply = await Reply.create(reply);
    if (!newReply) throw new Error("Reply creation failed");

    if (newReply) {
      const comment = await Comment.findById(reply.commentId);
      if (!comment) throw new Error("Comment not found hehe");
      comment.replies.push(newReply);
      await comment.save();
    }
    return JSON.parse(JSON.stringify(newReply));
  } catch (error) {
    console.log(error);
  }
};

export const deleteReply = async (id: string) => {
  try {
    await connectToDatabase();
    const reply = await Reply.findByIdAndDelete(id);
    if (!reply) throw new Error("Reply not found");
    if (reply) {
      const comment = await Comment.findById(reply.commentId);
      if (!comment) throw new Error("Comment not found");
      comment.replies = comment.replies.filter(
        (replyId: string) => replyId.toString() !== id
      );
      await comment.save();
    }
    return JSON.parse(JSON.stringify(reply));
  } catch (error) {
    console.log(error);
    return error;
  }
};
