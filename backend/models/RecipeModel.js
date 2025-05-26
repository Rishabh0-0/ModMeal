const mongoose = require('mongoose');

//////////////////////////////////////////////////////////////
/////////////////////// Ingredient Schema
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: Number,
  unit: String,
  prepration: String,
  optional: {
    type: Boolean,
    default: false,
  },
});

//////////////////////////////////////////////////////////////
/////////////////////// Recipe Schema
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A recipe must have a name'],
    },
    description: String,
    prepTime: {
      type: Number,
      required: [true, 'A recipe must have a prep-time'],
    },
    cookTime: {
      type: Number,
      required: [true, 'A recipe must have a cook-time'],
    },
    recipeYield: String,
    recipeCategory: String,
    recipeCuisine: String,
    keywords: [String],
    images: [String], // URL
    nutrition: {
      calories: String,
      fatContent: String,
      proteinContent: String,
      carbohydrateContent: String,
    },
    recipeIngredients: [ingredientSchema], // Array of Ingredents
    recipeInstruction: [
      {
        step: Number,
        text: String,
      },
    ],
    tips: String,
  },
  // OPT
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

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
