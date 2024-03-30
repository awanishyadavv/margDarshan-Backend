import mongoose from "mongoose";

const tripItemSchema = new mongoose.Schema({
    sNo:{
        type:Number,
        required:true,
    },
    date: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    activities: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    comments: {
        type: String
    }
});

const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    tripID: {
        type: String,
        required: true,
        unique: true,
        default: () => Math.random().toString(36).substring(2, 7).toUpperCase(),
        immutable: true
    },
    tripItems: {
        type: [tripItemSchema],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Trip = mongoose.model("Trip", tripSchema);
