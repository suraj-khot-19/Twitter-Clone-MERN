import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import {   getUsersNotification } from "../controller/noti.controller.js";
const router=express.Router();

router.get('/',userMiddleware,getUsersNotification);

export default router;