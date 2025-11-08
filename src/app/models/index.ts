import { Schema, model, models } from 'mongoose';

const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
});

const ProgressUpdateSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['DSA', 'LeetCode', 'Python', 'Courses'],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  links: [{
    title: String,
    url: String,
  }],
});

export const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);
export const ProgressUpdate = models.ProgressUpdate || model('ProgressUpdate', ProgressUpdateSchema);