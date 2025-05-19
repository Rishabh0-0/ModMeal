const Recipe = require('../models/recipeModel');

exports.getAllRecipe = async (req, res) => {
  const recipes = await Recipe.find({});

  res.json({
    success: true,
    results: recipes.length,
    data: recipes,
  });
};

exports.getRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    res.status(404).json({
      success: false,
      error: 'Recipe not found!',
    });
  }

  res.json({
    success: true,
    data: recipe,
  });
};

exports.createRecipe = async (req, res) => {
  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    data: recipe,
  });
};

exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!recipe) {
    res.status(404).json({
      success: false,
      error: 'Recipe not found!',
    });
  }

  res.json({
    success: true,
    data: recipe,
  });
};

exports.deleteRecipe = async (req, res) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

  if (!deletedRecipe) {
    res.status(404).json({
      success: false,
      error: 'Recipe not found!',
    });
  }

  res.status(204).json({
    success: true,
    data: {},
  });
};
