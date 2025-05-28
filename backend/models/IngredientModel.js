const mongoose = require('mongoose');

//////////////////////////////////////////////////////////////
/////////////////////// Ingredient Schema
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ingredient name is required'],
    unique: true,
    trim: true,
    index: true,
  },
  unit: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
