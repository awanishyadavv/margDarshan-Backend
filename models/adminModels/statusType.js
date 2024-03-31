import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const StatusType = mongoose.model("StatusType", schema);
