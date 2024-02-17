import { Schema, model, Document, models } from "mongoose";

export interface IComment extends Document {
  _id: string;
  text: string;
  postId: string;
  criticId: string;
  createdAt: Date;
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
  createdAt: { type: Date, default: Date.now }, // Added createdAt field
});

export default models.Comment || model("Comment", commentSchema);
