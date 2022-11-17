const Order = require('../models/order');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
   });
});

exports.createOrder = catchAsync(async (req, res, next) => {
   console.log(req.body, "req")
   const newOrder = await Order.create({
      customerName: req.body.customerName,
      customerId: req.body.customerId,
      customerEmail: req.body.customerEmail,
      shippingAddress: req.body.shippingAddress,
      billingAddress: req.body.billingAddress,
      status: req.body.status,
      orderItems: req.body.orderItems
   });

   if (!newOrder)
      return res.status(400).json({
         status: 'failed',
         message: `Can't create order due to invalid details`,
      });

   res.status(200).json({
      status: 'success',
      order: newOrder,
   });
});

exports.updateOrder = catchAsync(async (req, res, next) => {

   // 1) Filtered out unwanted fields names that are not allowed to be updated
   const filteredBody = filterObj(req.body, 'orderItems');
   const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
         new: true,
         runValidators: true,
      }
   );

   res.status(200).json({
      status: 'success',
      data: {
         order: updatedOrder,
      },
   });
});

exports.getOrder = catchAsync(async (req, res, next) => {
   const order = await Order.findById(req.params.id);

   if (!order)
      return res.status(404).json({
         status: 'failed',
         message: `No order found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      order,
   });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
   const deletedOrder = await Order.findByIdAndDelete(req.params.id);

   if (!deletedOrder)
      return res.status(404).json({
         status: 'failed',
         message: `No order found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      order: deletedOrder,
   });
});
