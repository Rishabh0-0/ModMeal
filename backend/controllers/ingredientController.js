const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Ingredient = require('../models/IngredientModel');

exports.getAllIngredients = catchAsync(async (req, res, next) => {
  const ingredients = await Ingredient.find();

  res.json({
    success: true,
    results: ingredients.length,
    data: ingredients,
  });
});
