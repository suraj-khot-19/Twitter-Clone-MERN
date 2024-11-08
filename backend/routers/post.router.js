import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getPostOfMyFollowing, likedByMe, likeOrUnlikePost,  usersPosts } from "../controller/post.controller.js";
const router = express.Router();

router.post('/new', userMiddleware, createPost)
router.delete('/delete/:id', userMiddleware, deletePost)
router.post('/comment/:id', userMiddleware, commentOnPost);
router.post('/like/:id', userMiddleware, likeOrUnlikePost);
router.get('/', userMiddleware, getAllPosts);
router.get('/user/:id', userMiddleware, likedByMe);
router.get('/following', userMiddleware, getPostOfMyFollowing);
router.get('/sort/user/:username', userMiddleware, usersPosts);

export default router;