const User = require("../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: req.query.role });

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  let userObj = {};

  if (req.body.role === "customer") {
    userObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
      address: req.body.address,
      mobileNo: req.body.mobileNo,
      nic: req.body.nic,
      gender:req.body.gender,
      province:req.body.province,
    };
  }

  if (req.body.role === "employee") {
    userObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
      address: req.body.address,
      mobileNo: req.body.mobileNo,
      nic: req.body.nic,
      dob: req.body.dob,
      gender:req.body.gender,
      joinDate: req.body.joinDate,
      dept: req.body.dept,
      salary: req.body.salary,
    };
  }

  const newUser = await User.create(userObj);

  if (!newUser)
    return res.status(400).json({
      status: "failed",
      message: `Can't create user due to invalid details`,
    });

  res.status(200).json({
    status: "success",
    user: newUser,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email", "mobileNo");
console.log(filteredBody, "body", req.body)
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({
      status: "failed",
      message: `No User found against id ${req.params.id}`,
    });

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getUserByRole = catchAsync(async (req, res, next) => {
  console.log(req.params, "hi");
  const users = await User.find({ role: "customer" });

  if (!user)
    return res.status(404).json({
      status: "failed",
      message: `No User found against id ${req.params.id}`,
    });

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser)
    return res.status(404).json({
      status: "failed",
      message: `No User found against id ${req.params.id}`,
    });

  res.status(200).json({
    status: "success",
    user: deletedUser,
  });
});
