import { Request, Response } from 'express';
import { BaseController } from '../BaseController';

export class HomeController extends BaseController {
    // Handle dashboard request
    public dashboard(req: Request, res: Response): void {
        // Render the dashboard view with user data
        res.render('dashboard', { title: 'Admin Login',  user: req.user });
    }

    // Implement abstract method from BaseController
    public handleRequest(req: Request, res: Response): void {
        // Example implementation, this can be modified as needed
        res.send('Handle request method is not implemented.');
    }
}
