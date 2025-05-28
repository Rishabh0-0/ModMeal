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
  preparation: String,
  optional: {
    type: Boolean,
    default: false,
  },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
