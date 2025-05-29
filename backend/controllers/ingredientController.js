const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Ingredient = require('../models/IngredientModel');

exports.getIngredients = catchAsync(async (req, res, next) => {
  const { category } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  const ingredients = await Ingredient.find(filter).sort({ name: 1 });

  res.json({
    success: true,
    results: ingredients.length,
    data: ingredients,
  });
});

exports.getIngredientCategories = catchAsync(async (req, res, next) => {
  const categories = await Ingredient.distinct('category');

  res.json({
    success: true,
    results: categories.length,
    data: categories,
  });
});
