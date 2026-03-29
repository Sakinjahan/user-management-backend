import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All task routes require authentication
router.use(authenticateToken);

// GET /api/tasks/stats - Must be before /:id route
router.get('/stats', TaskController.getTaskStats);

// POST /api/tasks - Create task
router.post('/', TaskController.createTask);

// GET /api/tasks - Get all tasks
router.get('/', TaskController.getAllTasks);

// GET /api/tasks/:id - Get single task
router.get('/:id', TaskController.getTaskById);

// PUT /api/tasks/:id - Update task
router.put('/:id', TaskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', TaskController.deleteTask);

export const taskRoutes = router;