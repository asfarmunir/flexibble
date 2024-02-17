import { Document, Schema, model, models } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  author: {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    photo: string;
  };
  category: string;
  githubUrl?: string;
  deploymentUrl?: string;
  images: string[];
  comments?: [
    {
      _id: string;
      text: string;
      postId: string;
      criticId: string;
    }
  ];
  rating?: string[];
}
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  githubUrl: {
    type: String,
  },
  deploymentUrl: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  rating: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default models.Project || model("Project", projectSchema);
