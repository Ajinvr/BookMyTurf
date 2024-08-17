import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {
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

export const Review = mongoose.model("review", reviewSchema);
