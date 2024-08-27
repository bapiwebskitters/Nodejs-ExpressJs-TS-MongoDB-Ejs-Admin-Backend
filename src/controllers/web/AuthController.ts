// src/controllers/web/AuthController.ts
import { Request, Response } from 'express';
import { BaseController } from './../BaseController';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/index';

export default class AuthController extends BaseController {
  // Handle login request
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return this.sendError(res, 'User not found', 404);
      }

      // Check if password is correct
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return this.sendError(res, 'Incorrect password', 401);
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id },JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Store the token in the session
      req.session.token = token;

      // Redirect to admin dashboard
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      this.sendError(res, 'An error occurred during login', 500);
    }
  }

  // Implement abstract method
  public handleRequest(req: Request, res: Response): void {
    res.send('Handle request method not implemented yet.');
  }
}
