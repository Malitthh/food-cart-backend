const Vehicle = require('../models/vehicle');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
   const newObj = {};
   Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });
   return newObj;
};

exports.getAllVehicles = catchAsync(async (req, res, next) => {

   const vehicles = await Vehicle.find();

   // SEND RESPONSE
   res.status(200).json({
      status: 'success',
      results: vehicles.length,
      data: {
         vehicles,
      },
   });
});

exports.createVehicle = catchAsync(async (req, res, next) => {
   const newVehicle = await Vehicle.create({
      make: req.body.make,
      model: req.body.model,
      vehicleNo: req.body.vehicleNo,
      vehicleType: req.body.vehicleType,
   });

   if (!newVehicle)
      return res.status(400).json({
         status: 'failed',
         message: `Can't create Vehicle due to invalid details`,
      });

   res.status(200).json({
      status: 'success',
      vehicle: newVehicle,
   });
});

exports.updateVehicle = catchAsync(async (req, res, next) => {

   // 1) Filtered out unwanted fields names that are not allowed to be updated
   const filteredBody = filterObj(req.body, 'vehicleNo');

   // 2) Update vehicle document
   const updatedVehicle = await Vehicle.findByIdAndUpdate(
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
         vehicle: updatedVehicle,
      },
   });
});

exports.getVehicle = catchAsync(async (req, res, next) => {
   const vehicle = await Vehicle.findById(req.params.id);

   if (!vehicle)
      return res.status(404).json({
         status: 'failed',
         message: `No vehicle found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      vehicle,
   });
});

exports.deleteVehicle = catchAsync(async (req, res, next) => {
   const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

   if (!deletedVehicle)
      return res.status(404).json({
         status: 'failed',
         message: `No vehicle found against id ${req.params.id}`,
      });

   res.status(200).json({
      status: 'success',
      vehicle: deletedVehicle,
   });
});
