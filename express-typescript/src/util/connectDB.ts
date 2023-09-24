import mongoose from "mongoose";

const connectDB = async() => {
    const dbURI = process.env.dbURI || "";
    console.log("[server]: Connecting to MongoDB Server");
    try {
        await mongoose.connect(dbURI);
    } catch (error) {
        console.log("⚡️[server]: Could not establish connection to database");
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;