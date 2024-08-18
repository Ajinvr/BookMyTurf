import mongoose from "mongoose";

const turfSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
    },
    imgLink: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    rent:{
        type: Number,
        required: true
    }, 
    rating:{
        type: Number,
        required: true,
        default:0
    },
    size:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    slots: [
        {
          timeRange: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            default:'available',
            enum: ['available','unavailable'], 
            required: true
          }
        }
    ],
    assignedTo:{
        type: String,
        required: true
    }
}, { timestamps: true });

export const turf = mongoose.model("turf", turfSchema);
