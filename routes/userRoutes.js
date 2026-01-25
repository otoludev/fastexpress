const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users - Get all users
router.get('/', userController.getAllUsers);

// POST /api/users - Add a new user
router.post('/', userController.addUser);

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
