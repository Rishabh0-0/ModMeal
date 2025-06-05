const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const protect = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/me').get(protect, userController.getMe);
router.route('/').get(userController.getAllUsers);

// TODO: Test this route
router.route('/:id').delete(userController.deleteUser);

module.exports = router;
