import express from "express";
import { getUserData, login, logout, signUp } from "../controller/auth.controller.js";
import userMiddleware from "../middleware/userMiddleware.js";

//router
const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', userMiddleware, getUserData); //middleware is there

export default router;