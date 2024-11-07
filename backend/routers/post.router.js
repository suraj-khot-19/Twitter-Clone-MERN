import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import { createPost } from "../controller/post.controller.js";
const router=express.Router();

router.post('/new',userMiddleware,createPost)

export default router;