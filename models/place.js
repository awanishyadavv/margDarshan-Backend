import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    placeId: {
        type: Number,
        required: true,
        unique: true,
    },
    placeName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    highlights: {
        type: [String],
        default: [],
    },
    bestWeather: {
        type: String,
        required: true
    },
    transportation: {
        type: [String],
        default: [],
    },
    compound: {
        type: [String],
        default: [],
    },
    nearbyPlaces: {
        type: [String],
        default: [],
    },
    famous: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Place = mongoose.model("Place", schema);
