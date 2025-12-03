import bcrypt from "bcryptjs";
import User from "../models/User.js";

import { sendUserResponse } from "../utils/helper.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, email and password are required" });
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
        sendUserResponse(res, newUser, "User registered successfully");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        sendUserResponse(res, user, "User Login successfully");
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const logout =  async (req, res )=>{
    
}