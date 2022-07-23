const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

const AdvertisementController = require('../controller/advertisement');

router.get('/', AdvertisementController.getAllAdvertisements);
router.get('/:id', AdvertisementController.getAdvertisement);
router.post('/', authController.requireAuth, AdvertisementController.addAdvertisement);
router.put('/:id', authController.requireAuth, authController.isOwner, AdvertisementController.editAdvertisement);
router.delete('/:id', authController.requireAuth, authController.isOwner, AdvertisementController.deleteAdvertisement);


module.exports = router;