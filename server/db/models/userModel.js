import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    role :{
        type: String,
        default: "user"
    }

}, { timestamps: true });

export const user = mongoose.model("user",userSchema)