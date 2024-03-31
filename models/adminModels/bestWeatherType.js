import mongoose from "mongoose";

// Database Schema/models
const schema = new mongoose.Schema({
    bestWeather: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const BestWeatherType = mongoose.model("BestWeatherType", schema);
