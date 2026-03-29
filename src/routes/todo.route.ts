import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Protected routes
/**
 * @swagger
 * /todos:
 *   get:
 *     tags: [Todo]
 *     summary: Get all todos
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter by priority
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title or description
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get('/', authenticateToken, TodoController.getAll);

/**
 * @swagger
 * /todos:
 *   post:
 *     tags: [Todo]
 *     summary: Create a new todo
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.post('/', authenticateToken, TodoController.create);

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     tags: [Todo]
 *     summary: Update a todo
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo updated successfully
 */
router.patch('/:id', authenticateToken, TodoController.update);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags: [Todo]
 *     summary: Delete a todo
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
router.delete('/:id', authenticateToken, TodoController.delete);

export const todoRoutes = router;