import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createPost,
  getPosts,
  getPostById,
} from "../controllers/posts.controllers.js";

const postsRoutes = express.Router();

postsRoutes.post("/", auth, createPost);
postsRoutes.get("/", getPosts);
postsRoutes.get("/:id", getPostById);

export default postsRoutes;
