const mongoose = require('mongoose');
const validator = require('validator');

//////////////////////////////////////////////////////////////
// Embedded Schema for Available Ingredients within User

const userAvailableIngredientSchema = mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    name_denormalized: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      min: [0, 'Quantity cannot be negative.'],
    },
    unit: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

//////////////////////////////////////////////////////////////
/////////////////////// User Schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password_hash: {
      type: String,
      required: [true, 'Password is required.'],
    },
    available_ingredients: [userAvailableIngredientSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
