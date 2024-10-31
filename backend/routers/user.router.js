import express from 'express';
const router = express.Router();
import userMiddleware from '../middleware/userMiddleware.js';
import { getProfile } from '../controller/user.controller.js';

router.get('/profile/:username', userMiddleware, getProfile); //url,middleware,controller

export default router;