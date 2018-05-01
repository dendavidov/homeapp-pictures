import mongoose from 'mongoose';

import { toJSON } from './helpers';

const ToDoItemSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    isDone: { type: Boolean, default: false },
  },
  {
    toJSON,
  }
);

mongoose.model('ToDoItem', ToDoItemSchema);
