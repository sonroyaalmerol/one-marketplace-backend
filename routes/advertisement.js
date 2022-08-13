const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

const QuestionController = require('../controller/question');
const AdvertisementController = require('../controller/advertisement');

router.get('/', AdvertisementController.getAllNonExpiredAdvertisements);
router.get('/:id', AdvertisementController.getAdvertisement);
router.post('/', authController.requireAuth, AdvertisementController.addAdvertisement);
router.put('/:id', authController.requireAuth, authController.isOwner, AdvertisementController.editAdvertisement);
router.delete('/:id', authController.requireAuth, authController.isOwner, AdvertisementController.deleteAdvertisement);
router.get('/:id/questions', AdvertisementController.getAllAnsweredQuestions);
router.get('/:id/questions/admin', authController.requireAuth, authController.isOwner, AdvertisementController.getAllQuestions);


router.get('/:id/questions/:questionId', QuestionController.getQuestion);

router.post('/:id/questions', QuestionController.addQuestion);
router.delete('/:id/questions/:questionId', authController.requireAuth, authController.isOwner, QuestionController.deleteQuestion);

router.post('/:id/questions/:questionId/answer', authController.requireAuth, authController.isOwner, QuestionController.addAnswer);
router.put('/:id/questions/:questionId/answer', authController.requireAuth, authController.isOwner, QuestionController.editAnswer);
router.delete('/:id/questions/:questionId/answer', authController.requireAuth, authController.isOwner, QuestionController.deleteAnswer);


module.exports = router;