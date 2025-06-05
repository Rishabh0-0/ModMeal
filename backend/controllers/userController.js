const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

//////////////////////////////////////////////////////////////
/////////////////////// GET ALL USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.json({
    sucess: true,
    results: users.length,
    data: users,
  });
});

//////////////////////////////////////////////////////////////
/////////////////////// GET CURRENT USER
exports.getMe = catchAsync(async (req, res, next) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

//////////////////////////////////////////////////////////////
/////////////////////// DELETE A USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    data: null,
  });
});
