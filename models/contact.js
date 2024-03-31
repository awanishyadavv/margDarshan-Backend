import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: false,
    },
    query: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default:"New Contact",
        required: true
    },
    isQueryClosed: {
        type: Boolean,
        default:false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Contact = mongoose.model("Contact", schema);
