import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";
import auth from "../middleware/auth.middleware.js";
const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login",auth, login);

export default authRoutes;
