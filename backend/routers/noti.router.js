import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import {  deleteNotificationById, getUsersNotification } from "../controller/noti.controller.js";
const router=express.Router();

router.get('/',userMiddleware,getUsersNotification);
router.delete('/:id',userMiddleware,deleteNotificationById);

export default router;