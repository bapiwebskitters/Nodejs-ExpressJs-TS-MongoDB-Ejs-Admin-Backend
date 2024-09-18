// src/routes/index.ts
import { Router, Request, Response, NextFunction } from 'express';
import webRoutes from './web';
import apiRoutes from './api';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

const router = Router();

// ** Apply security headers
router.use(helmet());
// ** HTTP request logger middleware
router.use(morgan('combined'));
// ** Rate limiter for API routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

// ** Apply rate limiting to API routes
router.use('/api', apiLimiter, apiRoutes);

// ** WEB routes
router.use(webRoutes);

// ** Global error handling middleware
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default router;

