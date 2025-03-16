import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";

export const createComment = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = new Comment({
      content,
      postId: req.params.postId,
      userId: req.userId,
    });

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
