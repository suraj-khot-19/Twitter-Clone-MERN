import express from "express";
import dotenv from "dotenv";
import router from "./routers/auth.router.js";
import connectToMongoDB from "./db/connectMongoDB.js";

//env
dotenv.config();

//app
const app = express();

//use routers
app.use('/api/v2/auth', router);

//port
const port = process.env.PORT || 5000;

// middleware for accept json
app.use(express.json());

//listen
app.listen(port, () => {
    console.log(`app is listning at port : ${port}`)
    //mongo db
    connectToMongoDB();
});