const express = require('express');
const router = express.Router();

const AdvertisementController = require('../controller/advertisement');

router.get('/', AdvertisementController.getAllAdvertisements);
router.get('/:id', AdvertisementController.getAdvertisement);
router.post('/', AdvertisementController.addAdvertisement);
router.put('/:id', AdvertisementController.editAdvertisement);
router.delete('/:id', AdvertisementController.deleteAdvertisement);


module.exports = router;