const mongoose = require("mongoose");

const recipeSchema = new mongoose.schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  prepTime: {
    type: Number,
    required: true,
  },
  cookTime: {
    type: Number,
    required: true,
  },
  totalTime: Number,
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
  recipeIngredients: [String], // Array of Ingredents list
  recipeInstruction: [
    {
      step: Number,
      text: String,
    },
  ],
  tips: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
