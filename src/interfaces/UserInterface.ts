import { Document } from 'mongoose';

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  role: string;  // Adjust according to your schema, could be ObjectId if referring to another model
  phone: string;
  email: string;
  dob: string | null;
  password: string;
  profile_image: string;
  registerType: 'Normal' | 'Phone' | 'Google' | 'Facebook' | 'Apple';
  otp: string;
  otp_updatedAt: Date | null;
  isDeleted: boolean;
  status: 'Active' | 'Inactive';
  comparePassword(password: string): Promise<boolean>;
}
