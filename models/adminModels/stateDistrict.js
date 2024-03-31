import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
    },
    districts: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const StateDistrict = mongoose.model("StateDistrict", schema);
