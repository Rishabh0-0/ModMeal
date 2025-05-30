const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const User = require('../models/UserModel');

const authMiddleware = catchAsync(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new AppError('Access denied! please login.'));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    next(new AppError('User to this token no longer exists.', 401));
  }

  // TODO: Check if user changed password after the token was issued
  req.user = user;
  next();
});

module.exports = authMiddleware;
