const Recipe = require('../models/recipeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/AppError');

//////////////////////////////////////////////////////////////
/////////////////////// GET ALL RECIPES
exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find({});

  res.json({
    success: true,
    results: recipes.length,
    data: recipes,
  });
});

//////////////////////////////////////////////////////////////
/////////////////////// GET A SINGLE RECIPE
exports.getRecipe = catchAsync(async (req, res, next) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return next(new AppError('Recipe not found!', 404));
  }

  res.json({
    success: true,
    data: recipe,
  });
});

//////////////////////////////////////////////////////////////
/////////////////////// CREATE A NEW RECIPE
exports.createRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    data: recipe,
  });
});

//////////////////////////////////////////////////////////////
/////////////////////// UPDATE AN EXISTING RECIPE
exports.updateRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!recipe) {
    return next(new AppError('Recipe not found!', 404));
  }

  res.json({
    success: true,
    data: recipe,
  });
});

//////////////////////////////////////////////////////////////
/////////////////////// DELETE A RECIPE
exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

  if (!deletedRecipe) {
    return next(new AppError('Recipe not found!', 404));
  }

  res.status(204).json({
    success: true,
    data: {},
  });
});
