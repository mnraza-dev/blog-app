import Router from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const router = Router();

router.get("/", (req, res) => {
    res.send("User route is working");
})

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    const existing_user = await User.findOne({ $or: [{ username }, { email }] });

    if (existing_user) {
        return res.status(409).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: passwordHash
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
});

export default router;