const express = require('express');
const router = express.Router();
const usersController = require('../controller/user');
const authController = require('../controller/auth');

// Routes for sign-up
router.post('/register', usersController.register);

// Routes for sign-in
router.post('/signin', usersController.signIn);

router.get('/self', authController.requireAuth, usersController.getSelf);

router.get('/:id', usersController.getUser);

module.exports = router;