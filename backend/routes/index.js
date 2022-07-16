const express = require('express');
const router = express.Router();

const controlerIndex = require('../controller/index');


router.get('/', controlerIndex.index);


module.exports = router;