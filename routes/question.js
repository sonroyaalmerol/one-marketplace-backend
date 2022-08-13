const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

const QuestionController = require('../controller/question');

router.get('/:id', QuestionController.getQuestion);

router.post('/', QuestionController.addQuestion);
router.delete('/:id', authController.requireAuth, authController.isOwner, QuestionController.deleteQuestion);

router.post('/:id/answer', authController.requireAuth, authController.isOwner, QuestionController.addAnswer);
router.put('/:id/answer', authController.requireAuth, authController.isOwner, QuestionController.editAnswer);
router.delete('/:id/answer', authController.requireAuth, authController.isOwner, QuestionController.deleteAnswer);


module.exports = router;