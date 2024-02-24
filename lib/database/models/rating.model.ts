import { Schema, model, models, Document } from "mongoose";

export interface IRating extends Document {
  _id: string;
  projectId: string;
  criticId: {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    photo: string;
  };
}

const ratingSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  criticId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export default models.Rating || model("Rating", ratingSchema);
