import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import { commentOnPost, createPost, deletePost } from "../controller/post.controller.js";
const router = express.Router();

router.post('/new', userMiddleware, createPost)
router.delete('/delete/:id', userMiddleware, deletePost)
router.post('/comment/:id',userMiddleware,commentOnPost);

export default router;