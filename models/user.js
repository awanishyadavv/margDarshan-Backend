import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

export const User = mongoose.model("User", schema);