//imports
import express from "express";
import dotenv from "dotenv";
import router from "./routers/auth.router.js";
import connectToMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

//env
dotenv.config();

//app
const app = express();

//port
const port = process.env.PORT || 5000;

//middleware for accept json
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

//use routers
app.use('/api/v2/auth', router);

//listen
app.listen(port, () => {
    console.log(`app is listning at port : ${port}`)
    //mongo db connection
    connectToMongoDB();
});
