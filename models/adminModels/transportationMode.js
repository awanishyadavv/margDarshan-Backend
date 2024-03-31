import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    transportationMode: {
        type: String,
        required: true,
        unique:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const TransportationMode = mongoose.model("TransportationMode", schema);