
import { Request, Response } from 'express';
import Todo, { Priority, Category } from '../models/todo.model';
import sanitize from 'mongo-sanitize';

export class TodoController {
  /**
   * GET all todos with optional filtering
   * @route GET /todos
   * @group Todo - Todo management
   * @param {string} category.query.optional - Filter by category (WORK, PERSONAL, HEALTH, FINANCE, OTHER)
   * @param {string} priority.query.optional - Filter by priority (LOW, MEDIUM, HIGH, URGENT)
   * @param {string} search.query.optional - Search in title or description
   * @returns {Array<object>} 200 - Array of todos
   * @returns {Error} 500 - Internal server error
   * @security JWT
   */
  static async getAll(req: Request, res: Response) {
    try {
      const { category, priority, search } = req.query;
      
      // Sanitize query parameters
      const sanitizedCategory = sanitize(category);
      const sanitizedPriority = sanitize(priority);
      const sanitizedSearch = sanitize(search);
      
      let query: any = {};

      if (sanitizedCategory && sanitizedCategory !== 'ALL') query.category = sanitizedCategory;
      if (sanitizedPriority && sanitizedPriority !== 'ALL') query.priority = sanitizedPriority;
      if (sanitizedSearch) {
        query.$or = [
          { title: { $regex: sanitizedSearch, $options: 'i' } },
          { description: { $regex: sanitizedSearch, $options: 'i' } }
        ];
      }

      const todos = await Todo.find(query).sort({ createdAt: -1 });
      res.json(todos);
    } catch (error: any) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * POST create new todo
   * @route POST /todos
   * @group Todo - Todo management
   * @param {string} title.body.required - Todo title
   * @param {string} description.body.optional - Todo description
   * @param {string} priority.body.optional - Priority level (LOW, MEDIUM, HIGH, URGENT)
   * @param {string} category.body.optional - Category (WORK, PERSONAL, HEALTH, FINANCE, OTHER)
   * @param {Array<object>} subTasks.body.optional - Subtasks array
   * @returns {object} 201 - Created todo object
   * @returns {Error} 400 - Validation error
   * @returns {Error} 500 - Internal server error
   * @security JWT
   */
  static async create(req: Request, res: Response) {
    try {
      // Sanitize input to prevent injection attacks
      const sanitizedBody = sanitize(req.body);
      
      // Validate required fields
      if (!sanitizedBody.title) {
        return res.status(400).json({ message: 'Title is required' });
      }
      
      // Validate priority and category enums
      if (sanitizedBody.priority && !Object.values(Priority).includes(sanitizedBody.priority)) {
        return res.status(400).json({ message: 'Invalid priority value' });
      }
      
      if (sanitizedBody.category && !Object.values(Category).includes(sanitizedBody.category)) {
        return res.status(400).json({ message: 'Invalid category value' });
      }
      
      const todo = new Todo(sanitizedBody);
      const savedTodo = await todo.save();
      res.status(201).json(savedTodo);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * PATCH update todo
   * @route PATCH /todos/{id}
   * @group Todo - Todo management
   * @param {string} id.path.required - Todo ID
   * @param {string} title.body.optional - Todo title
   * @param {string} description.body.optional - Todo description
   * @param {string} priority.body.optional - Priority level (LOW, MEDIUM, HIGH, URGENT)
   * @param {string} category.body.optional - Category (WORK, PERSONAL, HEALTH, FINANCE, OTHER)
   * @param {Array<object>} subTasks.body.optional - Subtasks array
   * @returns {object} 200 - Updated todo object
   * @returns {Error} 400 - Validation error
   * @returns {Error} 404 - Todo not found
   * @returns {Error} 500 - Internal server error
   * @security JWT
   */
  static async update(req: Request, res: Response) {
    try {
      // Sanitize the ID parameter to prevent injection
      const sanitizedId = sanitize(req.params.id);
      
      // Sanitize body data
      const sanitizedBody = sanitize(req.body);
      
      // Validate priority and category enums if present
      if (sanitizedBody.priority && !Object.values(Priority).includes(sanitizedBody.priority)) {
        return res.status(400).json({ message: 'Invalid priority value' });
      }
      
      if (sanitizedBody.category && !Object.values(Category).includes(sanitizedBody.category)) {
        return res.status(400).json({ message: 'Invalid category value' });
      }
      
      const updatedTodo = await Todo.findByIdAndUpdate(
        sanitizedId, 
        sanitizedBody, 
        { new: true }
      );
      if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
      res.json(updatedTodo);
    } catch (error: any) {
      console.error('Error updating todo:', error);
      res.status(400).json({ message: 'Bad request' });
    }
  }

  /**
   * DELETE todo
   * @route DELETE /todos/{id}
   * @group Todo - Todo management
   * @param {string} id.path.required - Todo ID
   * @returns {object} 200 - Success message
   * @returns {Error} 404 - Todo not found
   * @returns {Error} 500 - Internal server error
   * @security JWT
   */
  static async delete(req: Request, res: Response) {
    try {
      // Sanitize the ID parameter to prevent injection
      const sanitizedId = sanitize(req.params.id);
      
      const deletedTodo = await Todo.findByIdAndDelete(sanitizedId);
      if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
      res.json({ message: 'Todo deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
