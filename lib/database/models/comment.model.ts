import { Schema, model, Document, models } from "mongoose";

export interface IReply extends Document {
  _id: string;
  text: string;
  commentId: string;
  criticId: string;
  createdAt: Date;
}

const replySchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
  criticId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Reply = models.Reply || model("Reply", replySchema);

export interface IComment extends Document {
  _id: string;
  text: string;
  postId: string;
  criticId: {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    photo: string;
  };
  replies: string[]; // Array of replies
  createdAt: string;
}

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  criticId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }], // Array of reply references
  createdAt: { type: Date, default: Date.now },
});

export const Comment = models.Comment || model("Comment", commentSchema);
