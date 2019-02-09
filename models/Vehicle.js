const mongoose = require('mongoose');

const { Schema } = mongoose;

const vehicleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('vehicles', vehicleSchema);
