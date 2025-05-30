const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { username, password, email } = req.body;

  // Validation
  if (!username || !password || !email) {
    return next(new AppError('All fields are required', 400));
  }

  if (password.length < 6) {
    return next(new AppError('Password must be at least 6 characters', 400));
  }

  const existingUser = await User.find({ $or: [{ username }, { email }] });

  if (existingUser.length > 0) {
    return next(
      new AppError('User with this email or username already exists', 400)
    );
  }

  // Create user
  const user = await User.create({ username, email, password });

  // Generate a token
  const token = signToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: { id: user._id, username: user.username, email: user.email },
  });
});
