import { Request, Response } from 'express';
import Task, { Priority, Category } from '../models/task.model';
import sanitize from 'mongo-sanitize';

export class TaskController {
  // Create Task - POST /api/tasks
  static async createTask(req: Request, res: Response) {
    try {
      const sanitizedBody = sanitize(req.body);
      const { title, description, priority, category } = sanitizedBody;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: 'Title is required.'
        });
      }

      const task = new Task({
        title,
        description,
        priority: priority || Priority.MEDIUM,
        category: category || Category.OTHER,
        userId: req.user._id
      });

      await task.save();

      res.status(201).json({
        success: true,
        message: 'Task created successfully.',
        task
      });
    } catch (error: any) {
      console.error('Create task error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create task.'
      });
    }
  }

  // Get All Tasks - GET /api/tasks
  static async getAllTasks(req: Request, res: Response) {
    try {
      const { priority, category, search, sortBy = 'createdAt', order = 'desc' } = req.query;
      
      const filter: any = { userId: req.user._id };
      
      if (priority) {
        filter.priority = priority;
      }
      
      if (category) {
        filter.category = category;
      }
      
      if (search) {
        filter.title = { $regex: search, $options: 'i' };
      }

      const sortOrder = order === 'asc' ? 1 : -1;
      const sortOptions: any = {};
      sortOptions[sortBy as string] = sortOrder;

      const tasks = await Task.find(filter).sort(sortOptions);

      res.status(200).json({
        success: true,
        count: tasks.length,
        tasks
      });
    } catch (error: any) {
      console.error('Get tasks error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve tasks.'
      });
    }
  }

  // Get Single Task - GET /api/tasks/:id
  static async getTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const task = await Task.findOne({ _id: id, userId: req.user._id });
      
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      res.status(200).json({
        success: true,
        task
      });
    } catch (error: any) {
      console.error('Get task error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve task.'
      });
    }
  }

  // Update Task - PUT /api/tasks/:id
  static async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sanitizedBody = sanitize(req.body);
      const { title, description, priority, category, completed } = sanitizedBody;

      const updateData: any = {};
      
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (priority !== undefined) updateData.priority = priority;
      if (category !== undefined) updateData.category = category;
      if (completed !== undefined) updateData.completed = completed;

      const task = await Task.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        updateData,
        { new: true, runValidators: true }
      );

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task updated successfully.',
        task
      });
    } catch (error: any) {
      console.error('Update task error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update task.'
      });
    }
  }

  // Delete Task - DELETE /api/tasks/:id
  static async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
      
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully.'
      });
    } catch (error: any) {
      console.error('Delete task error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete task.'
      });
    }
  }

  // Get Dashboard Stats - GET /api/tasks/stats
  static async getTaskStats(req: Request, res: Response) {
    try {
      const userId = req.user._id;

      const totalTasks = await Task.countDocuments({ userId });
      const completedTasks = await Task.countDocuments({ userId, completed: true });
      const pendingTasks = totalTasks - completedTasks;

      res.status(200).json({
        success: true,
        stats: {
          totalTasks,
          completedTasks,
          pendingTasks
        }
      });
    } catch (error: any) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve task statistics.'
      });
    }
  }
}