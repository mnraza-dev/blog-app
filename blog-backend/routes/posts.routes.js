import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createPost,
  getPosts,
  getPostById,
} from "../controllers/posts.controllers.js";

const postsRoutes = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);

export default postsRoutes;
