var express = require('express');
var router = express.Router();

let AddController = require('../controller/advertisement');

router.get('/add',AddController.AddList);

module.exports = router;