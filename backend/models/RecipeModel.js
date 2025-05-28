const mongoose = require('mongoose');
const Ingredient = require('./IngredientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//////////////////////////////////////////////////////////////
////////// Embedded Schema for Ingredients within Recipes
const recipeIngredientSchema = new mongoose.Schema(
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
      required: [true, 'Quantity for recipe ingredient is required.'],
      min: [0, 'Quantity cannot be negative.'],
    },
    unit: {
      type: String,
      required: [true, 'Unit for recipe indredient is required.'],
      trim: true,
    },
  },
  { _id: false }
);

//////////////////////////////////////////////////////////////
/////////////////////// Recipe Schema
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A recipe must have a name'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    instructions: {
      type: [String],
      required: [true, 'Recipe instructions are required.'],
      validate: [(val) => val.length > 0, 'Instructions cannot be empty'],
    },
    prep_time_minutes: {
      type: Number,
      min: [0, 'Preparation time cannot be negative.'],
    },
    cook_time_minutes: {
      type: Number,
      min: [0, 'Cooking time cannot be negative.'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    servings: {
      type: Number,
      min: [1, 'Servings must be atleast 1'],
    },
    tags: {
      type: [String],
      index: true,
    },
    images_url: [String],
    ingredients_required: {
      type: [recipeIngredientSchema],
      validate: [
        (val) => val.length > 0,
        'A recipe must have at least 1 ingredient.',
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//////////////////////////////////////////////////////////////
/////////////////////// Virtuals
recipeSchema.virtual('totalTime').get(function () {
  return this.prepTime + this.cookTime;
});

//////////////////////////////////////////////////////////////
//Pre-save hook to denormalize ingredient names in recipes
recipeSchema.pre(
  'save',
  catchAsync(async function (next) {
    if (this.isModified('ingredients_required') || this.isNew) {
      for (const item of this.ingredients_required) {
        if (item.ingredient && !item.name_denormalized) {
          const ingredientDoc = await Ingredient.findById(item.ingredient);
          if (!ingredientDoc) {
            return next(
              new AppError('Error fetching ingredient for normalization', 404)
            );
          }
          name_denormalized = ingredientDoc.name;
        }
      }
    }
    next();
  })
);

//////////////////////////////////////////////////////////////

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
