//imports
import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import authRouter from './routers/auth.router.js'
import userRouter from './routers/user.router.js'
import postRouter from './routers/post.router.js'
import notificationRouter from './routers/noti.router.js'
import { v2 as cloudinary } from 'cloudinary'

//env
dotenv.config();

//configurring cloudinary
cloudinary.config({
    api_key: process.env.CLOUD_API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUD_SECREATE,
})

//app
const app = express();

//port
const port = process.env.PORT || 5000;

//middleware for accept json
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

//use routers
app.use('/api/v2/auth', authRouter);
app.use('/api/v2/user', userRouter);
app.use('/api/v2/post',postRouter);
app.use('/api/v2/notification',notificationRouter)

//listen
app.listen(port, () => {
    console.log(`app is listning at port : ${port}`)
    //mongo db connection
    connectToMongoDB();
});
