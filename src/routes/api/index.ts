// src/routes/api/index.ts
import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
