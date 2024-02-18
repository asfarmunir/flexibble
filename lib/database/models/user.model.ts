import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
}

const UserSchema = new Schema({
  clerkId: { type: String },
  email: { type: String },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
