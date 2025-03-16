import { Post } from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const post = new Post({
      title,
      content,
      userId: req.userId,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "userId",
      "username email"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
