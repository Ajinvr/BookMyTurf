import mongoose from 'mongoose';

const turfTimeSlotsSchema = new mongoose.Schema({
  turfId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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
        default:"available",
        enum: ['available', 'unavailable', 'booked'], 
        required: true
      }
    }
  ]
});

export const turfSlot = mongoose.model('turfTimeSlot', turfTimeSlotsSchema);
