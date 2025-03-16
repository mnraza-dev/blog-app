import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { createComment } from '../controllers/comment.controllers.js';

const commentRoutes = express.Router();

commentRoutes.post('/:postId', auth, createComment);

export default commentRoutes;