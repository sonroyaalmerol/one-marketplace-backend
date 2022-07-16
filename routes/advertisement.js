var express = require('express');
var router = express.Router();

let AddController = require('../controller/advertisement');

router.get('/add',AddController.AddList);

router.get('/edit/:id', AddController.displayEditPage);
router.post('/edit/:id', AddController.processEditPage);


module.exports = router;