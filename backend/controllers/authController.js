const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

//////////////////////////////////////////////////////////////
/////////////////////// REGISTER A NEW USER
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

//////////////////////////////////////////////////////////////
/////////////////////// LOGIN A USER
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = signToken(user._id);

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

//////////////////////////////////////////////////////////////
/////////////////////// LOGOUT
exports.logout = catchAsync(async (req, res, next) => {
  res.json({ message: 'Logout successful' });
});
