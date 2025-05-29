const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredientController');

router.route('/').get(ingredientController.getIngredients);
router.route('/categories').get(ingredientController.getIngredientCategories);

module.exports = router;
