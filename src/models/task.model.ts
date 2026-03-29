import mongoose, { Schema, Document } from 'mongoose';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum Category {
  PERSONAL = 'PERSONAL',
  WORK = 'WORK',
  OTHER = 'OTHER'
}

export interface ITask extends Document {
  title: string;
  description?: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
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
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

TaskSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<ITask>('Task', TaskSchema);
