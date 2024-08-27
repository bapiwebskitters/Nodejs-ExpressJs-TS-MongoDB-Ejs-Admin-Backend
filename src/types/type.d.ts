
import { Types } from "mongoose";

interface User {
  _id: any;
  first_name: string;
  email: string;
  last_name: string;
  profile_image: string;
  role: {
    _id: Types.ObjectId | string;
    role: String;
  };
}

declare global {
  namespace Express {
    interface User extends CustomUser {}
    interface Request {
      user?: User;
    }
  }
}

declare module "express-serve-static-core" {
  interface Response {
    renderWithLayout(view: string, locals?: any): void;
  }
}
