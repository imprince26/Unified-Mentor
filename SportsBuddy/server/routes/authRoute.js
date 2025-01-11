import express from "express";
import { login, register, logout, getCurrentUser, findUserById } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me",isAuthenticated,getCurrentUser);
router.get("/user/:id",findUserById)
export default router;
