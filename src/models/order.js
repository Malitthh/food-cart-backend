const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Please tell us customer name!"],
    unique: false,
    trim: false,
    maxlength: [20, "must be less than or equal to 20"],
    minlength: [3, "must be greater than 3"],
  },
  customerId: {
    type: String,
    required: [true, "Please provide customerID"],
    unique: false,
    trim: false,
  },
  customerEmail: {
    type: String,
    required: [true, "Please provide customer email"],
    unique: false,
    trim: false,
  },
  shippingAddress: {
    name: String,
    mobile: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    postalCode: String,
  },
  billingAddress: {
    name: String,
    mobile: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    postalCode: String,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancel"],
    default: "pending",
  },
  orderItems: [
    {
      id: String,
      quantity: Number,
      productName: String,
      image: String,
      price: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
