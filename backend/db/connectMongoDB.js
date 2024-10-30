import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongo db connection done, ", connect.connection.host);
    } catch (error) {
        console.log("error to connect to mongodb, ", error.message);
        process.exit(1); //exit   
    }
}

export default connectToMongoDB;