import mongoose, { Document, Schema } from "mongoose";

// Define an interface for User
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
