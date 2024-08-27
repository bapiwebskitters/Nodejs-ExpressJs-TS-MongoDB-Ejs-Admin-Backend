import { Request, Response } from "express";

export default class HomeController {
  public user(req: Request, res: Response): void {
    console.log("user", req.user);
    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: req.user,
    });
  }
}
