const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const Ingredient = require('./IngredientModel');

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
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    available_ingredients: [userAvailableIngredientSchema],
  },
  {
    timestamps: true,
  }
);

//////////////////////////////////////////////////////////////
//Pre-save hook to denormalize ingredient names in user's available ingredients
userSchema.pre('save', async function (next) {
  if (this.isModified('available_ingredients') || this.isNew) {
    for (const item of this.available_ingredients) {
      if (item.ingredient && !item.name_denormalized) {
        const ingredientDoc = await Ingredient.findById(item.ingredient);
        if (!ingredientDoc) {
          throw new AppError(
            'Error fetching ingredient for user denormalization.',
            404
          );
        }
        item.name_denormalized = ingredientDoc.name;
      }
    }
  }
  next();
});

//////////////////////////////////////////////////////////////
///// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
