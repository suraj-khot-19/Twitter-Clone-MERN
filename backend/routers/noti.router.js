import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import {  deleteAllNotification, deleteNotificationById, getUsersNotification } from "../controller/noti.controller.js";
const router=express.Router();

router.get('/',userMiddleware,getUsersNotification);
router.delete('/:id',userMiddleware,deleteNotificationById);
router.delete('/',userMiddleware,deleteAllNotification);

export default router;