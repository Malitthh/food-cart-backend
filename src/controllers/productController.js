const Product = require('../models/product');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
   const newObj = {};
   Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });
   return newObj;
};

exports.getAllProducts = catchAsync(async (req, res, next) => {

   const products = await Product.find();

   // SEND RESPONSE
   res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
   });
});

exports.createProduct = catchAsync(async (req, res, next) => {
   console.log(req.body, "req")
   const newProduct = await Product.create({
      productName: req.body.productName,
      description: req.body.description,
      costPrice: req.body.costPrice,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      photos: req.body.photos
   });

   if (!newProduct)
      return res.status(400).json({
         status: 'failed',
         message: `Can't create product due to invalid details`,
      });

   res.status(200).json({
      status: 'success',
      product: newProduct,
   });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
   console.log(req.body.photos.length)
   let filteredBody = '';
   if(req.body.photos.length === 0) {
       filteredBody = filterObj(req.body, 'photos');
   } else {
       filteredBody = req.body;
   }
   // 1) Filtered out unwanted fields names that are not allowed to be updated
 

   // 2) Update vehicle document
   const updatedProduct = await Product.findByIdAndUpdate(
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
         product: updatedProduct,
      },
   });
});

exports.getProduct = catchAsync(async (req, res, next) => {
   const product = await Product.findById(req.params.id);

   if (!product)
      return res.status(404).json({
         status: 'failed',
         message: `No product found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      product,
   });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
   const deletedProduct = await Product.findByIdAndDelete(req.params.id);

   if (!deletedProduct)
      return res.status(404).json({
         status: 'failed',
         message: `No Product found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      product: deletedProduct,
   });
});
