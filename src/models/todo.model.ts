
import mongoose, { Schema, Document } from 'mongoose';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum Category {
  WORK = 'WORK',
  PERSONAL = 'PERSONAL',
  HEALTH = 'HEALTH',
  FINANCE = 'FINANCE',
  OTHER = 'OTHER'
}

interface ISubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  subTasks: ISubTask[];
  createdAt: Date;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  completed: { type: Boolean, default: false },
  priority: { 
    type: String, 
    enum: Object.values(Priority), 
    default: Priority.MEDIUM 
  },
  category: { 
    type: String, 
    enum: Object.values(Category), 
    default: Category.OTHER 
  },
  subTasks: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
