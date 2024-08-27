import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from '../interfaces/UserInterface'; // Adjust the path as needed

const registerType = ["Normal", "Phone", "Google", "Facebook", "Apple"];
const statusType = ["Active", "Inactive"];

const UserSchema: Schema<IUser> = new Schema(
  {
    first_name: { type: String, default: "", index: true },
    last_name: { type: String, default: "", index: true },
    full_name: { type: String, default: "", index: true },
    username: { type: String, default: "", index: true },
    // role: { type: Schema.Types.ObjectId, ref: "Role", index: true },
    phone: { type: String, default: "", index: true },
    email: { type: String, default: "", index: true },
    dob: { type: String, default: null },
    password: { type: String, default: "" },
    profile_image: { type: String, default: "" },
    registerType: { type: String, default: "Normal", enum: registerType },
    otp: { type: String, default: "" },
    otp_updatedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false, index: true },
    status: { type: String, default: "Active", enum: statusType, index: true },
  },
  { versionKey: false, timestamps: true }
);

// Hash the user's password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error); // Type assertion to Error
  }
});

// Method to compare provided password with stored hashed password
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = model<IUser>("User", UserSchema);

export default User;
