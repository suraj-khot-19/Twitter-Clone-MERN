import express from 'express';
const router = express.Router();
import userMiddleware from '../middleware/userMiddleware.js';
import { followOrUnfollow, getProfile, getSuggestedUser, updateProfile } from '../controller/user.controller.js';

router.get('/profile/:username', userMiddleware, getProfile); //url,middleware,controller
router.get('/follow/:id', userMiddleware, followOrUnfollow); //url,middleware,controller
router.get('/suggetion', userMiddleware, getSuggestedUser); //url,middleware,controller
router.post('/update', userMiddleware, updateProfile); //url,middleware,controller

export default router;