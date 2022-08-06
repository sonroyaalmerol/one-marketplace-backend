const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

const RateController = require('../controller/rate');

router.get('/', RateController.getAllRates);
router.get('/:id', RateController.getRate);
router.post('/', authController.requireAuth, RateController.addRate);
router.put('/:id', authController.requireAuth, authController.isOwner, RateController.editRate);
router.delete('/:id', authController.requireAuth, authController.isOwner, RateController.deleteRate);


module.exports = router;