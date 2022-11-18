const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please tell us product name!'],
    unique: true,
    trim: false,
    maxlength: [20, 'must be less than or equal to 20'],
    minlength: [3, 'must be greater than 3'],
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    unique: false,
    trim: false,
  },
  costPrice: {
    type: Number,
    required: [true, 'Please provide cost price'],
    unique: false,
    trim: false,
  },
  price: {
    type: Number,
    required: [true, 'Please provide selling price'],
    unique: false,
    trim: false,
  },
  category: {
    type: String,
    enum: ['fruit_nuts', 'vegetables','berries','butter_eggs'],
    default: 'fruit_nuts',
  },
  stock: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  photos: [{ uuid: String, url: String }],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
