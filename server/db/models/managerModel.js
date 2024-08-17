import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({

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
        enum: ["manager" , "admin"],
        default: "manager"
    }

}, { timestamps: true });

export const user = mongoose.model("manager",managerSchema)