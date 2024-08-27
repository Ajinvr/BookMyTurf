import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    turfId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    description: {
        type: String
    }
}, { timestamps: true });

export const review = mongoose.model("review", reviewSchema);
