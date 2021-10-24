const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allawedFilds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allawedFilds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user post password data
  const { password, passwordConfim } = req.body;
  if (password || passwordConfim) {
    return next(
      new AppError(
        'this route is not for password update. Please use : /updateMyPassword',
        400
      )
    );
  }
  // 2) filterd out unwanted filds
  const filtredBody = filterObj(req.body, 'name', 'email');
  // 3) UPDATE USER DOCUMENT
  const user = await User.findByIdAndUpdate(req.user._id, filtredBody, {
    new: true,
    runValidators: true,
  });
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
