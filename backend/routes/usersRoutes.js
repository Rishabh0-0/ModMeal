const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(authController.register);
router.route('/').get(userController.getAllUsers);

// TODO: Test this route
router.route('/:id').delete(userController.deleteUser);

module.exports = router;
