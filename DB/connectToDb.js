import mongoose from "mongoose";

async function connectToDatabase(uri){
    try {
        const connect = await mongoose.connect(uri);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
    }
}

export default connectToDatabase;