var express = require('express');
var router = express.Router();
const {getLifeChips} = require('../route_handles/lifeChipsHandle');
/* GET home page. */
router.get('/get', getLifeChips);


module.exports = router;
