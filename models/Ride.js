const mongoose = require('mongoose');

const { Schema } = mongoose;

const rideSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  originName: {
    type: String,
    required: true,
  },
  destinationName: {
    type: String,
    required: true,
  },
  travelTime: {
    type: Number,
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  vehicle: {
    ref: 'vehicles',
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'finished'],
    default: 'active',
  }
});

module.exports = mongoose.model('rides', rideSchema);
