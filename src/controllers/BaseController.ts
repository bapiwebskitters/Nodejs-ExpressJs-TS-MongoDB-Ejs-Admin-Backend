import { Request, Response } from 'express';

export abstract class BaseController {
    // Common method for sending a success response
    protected sendSuccess(res: Response, data: any, message: string = 'Success') {
        res.status(200).json({
            status: 'success',
            message,
            data
        });
    }

    // Common method for sending an error response
    protected sendError(res: Response, message: string = 'Error', statusCode: number = 400) {
        res.status(statusCode).json({
            status: 'error',
            message
        });
    }

    // Abstract method to be implemented by subclasses
    abstract handleRequest(req: Request, res: Response): void;
}
