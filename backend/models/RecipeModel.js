const mongoose = require("mongoose");

//////////////////////////////////////////////////////////////
/////////////////////// Ingredient Schema
const ingredientSchema = new mongoose.schema({
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
const recipeSchema = new mongoose.schema(
  {
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
  {
    toJSON: { virutals: true },
  }
);

//////////////////////////////////////////////////////////////
/////////////////////// Virtuals
recipeSchema.virtual("totalTime").get(function () {
  return this.prepTime + this.cookTime;
});

//////////////////////////////////////////////////////////////

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
