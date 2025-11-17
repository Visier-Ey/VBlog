var express = require('express');
var router = express.Router();

const {getLayouts} = require('../route_handles/postcardLayoutsHandle');

/* GET home page. */
router.get('/get', getLayouts);


module.exports = router;
