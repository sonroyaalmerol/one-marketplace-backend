const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

const CategoryController = require('../controller/category');

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategory);
// router.post('/', authController.requireAuth, CategoryController.addCategory);
// router.put('/:id', authController.requireAuth, authController.isOwner, CategoryController.editCategory);
// router.delete('/:id', authController.requireAuth, authController.isOwner, CategoryController.deleteCategory);

router.get('/:id/advertisements', CategoryController.getAddCategory);

module.exports = router;