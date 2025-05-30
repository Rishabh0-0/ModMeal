const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredientController');
const protect = require('../middleware/auth');

router.route('/').get(protect, ingredientController.getIngredients);
router.route('/categories').get(ingredientController.getIngredientCategories);

module.exports = router;
