import mongoose, { Document, Schema, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User interface extending Document
export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

// Create the User schema
const UserSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});

// Hash the user's password before saving
UserSchema.pre<IUser>('save', async function (next: (err?: CallbackError) => void) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as CallbackError);  // Type assertion to CallbackError
  }
});

// Method to compare provided password with stored hashed password
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
