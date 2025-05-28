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

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Ingredient.distinct('category');

  res.json({
    success: true,
    results: categories.length,
    data: categories,
  });
});
