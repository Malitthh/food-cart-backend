const Order = require("../models/order");
const Product = require("../models/product");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create({
    customerName: req.body.customerName,
    customerId: req.body.customerId,
    customerEmail: req.body.customerEmail,
    shippingAddress: req.body.shippingAddress,
    billingAddress: req.body.billingAddress,
    status: req.body.status,
    orderItems: req.body.orderItems,
  });

  req.body.orderItems.forEach(async (item) => {
    const product = await Product.findById(item.id);
    product.stock = product.stock - item.quantity;
    product.sold = product.sold + item.quantity;

    await Product.findByIdAndUpdate(item.id, product, {
      new: true,
      runValidators: true,
    });
  });

  // const product = await Product.findById(req.params.id);

  if (!newOrder)
    return res.status(400).json({
      status: "failed",
      message: `Can't create order due to invalid details`,
    });

  res.status(200).json({
    status: "success",
    order: newOrder,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  // 1) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "orderItems");

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      order: updatedOrder,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({
      status: "failed",
      message: `No order found against id ${req.params.id}`,
    });

  res.status(200).json({
    status: "success",
    order,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);

  if (!deletedOrder)
    return res.status(404).json({
      status: "failed",
      message: `No order found against id ${req.params.id}`,
    });

  res.status(200).json({
    status: "success",
    order: deletedOrder,
  });
});
