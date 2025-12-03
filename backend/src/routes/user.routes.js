import Router from 'express';
import User from '../models/User.js';
import { register, login } from '../controllers/auth.controller.js';
const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
router.post("/register", register);
router.post("/login", login)

export default router;