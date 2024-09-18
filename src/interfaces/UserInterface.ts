import mongoose, { Document, Types } from 'mongoose';

export interface IUser extends Document {
  first_name?: string;
  last_name?: string;
  username?: string;
  role: mongoose.Types.ObjectId;
  email: string;
  password: string;
  status: "Active" | "Inactive";
  comparePassword(password: string): Promise<boolean>;
  full_name: string;
  branch_id?: Types.ObjectId | null;
  phone?: string;
  contact_person?: string;
  contact_person_phone?: string;
  house_no?: string;
  address?: string;
  city?:string;
  zipcode?:string;
  state?: string;
  landmark?: string;
  profile_image?: string;
  isDeleted:boolean
}
