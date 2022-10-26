const mongoose = require('mongoose');
const validator = require('validator');

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Please tell us vehicle make!'],
    unique: false,
    trim: false,
    maxlength: [20, 'must be less than or equal to 20'],
    minlength: [3, 'must be greater than 3'],
  },
  model: {
    type: String,
    required: [true, 'Please provide your model'],
    unique: false,
    trim: false,
  },
  vehicleNo: {
    type: String,
    required: [true, 'Please provide your vehicle No'],
    unique: true,
    trim: false,
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'lorry'],
    default: 'bike',
  },
  isAvaibale: {
    type: Boolean,
    default: true,
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
