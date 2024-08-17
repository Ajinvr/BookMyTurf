import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  turfId: {
    type: String,
    required: true
  },
  bookingdate: {
    type: Date,
    required: true
  },
  timeRange: [ 
    {
     type: String,
     required: true
    } 
  ],
  billAmount: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'confirmed',
    enum: ['confirmed', 'canceled'],
  },
});

export const Order = mongoose.model('order', orderSchema);
