import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    subCategories: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const CategoryType = mongoose.model("CategoryType", schema);
