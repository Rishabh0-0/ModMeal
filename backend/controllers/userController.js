const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.json({
    sucess: true,
    results: users.length,
    data: users,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    data: null,
  });
});
