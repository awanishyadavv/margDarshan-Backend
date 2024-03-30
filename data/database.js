import mongoose from "mongoose";

// Database Connection

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "margDarshanDatabase",
    })
        .then(() => console.log("Database Connected"))
        .catch((error) => console.log(error)); 
}


