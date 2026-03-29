import { Router } from 'express';
import { authRoutes } from './auth.route';
import { healthRoutes } from './health.route';
import { taskRoutes } from './task.route';
import { todoRoutes } from './todo.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/health', healthRoutes);
router.use('/tasks', taskRoutes);
router.use('/todos', todoRoutes);

export default router;