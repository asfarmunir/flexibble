import { Schema, model, models } from "mongoose";

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
