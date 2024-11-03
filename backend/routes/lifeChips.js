var express = require('express');
var router = express.Router();
const {getLifeChips} = require('../route_handles/lifeChipsHandle');
const {addLifeChips} = require('../route_handles/lifeChipsHandle');
const {LifeChipsUpLoad} = require('../multer/index');
/* GET home page. */
router.get('/get', getLifeChips);

router.post('/add',LifeChipsUpLoad, addLifeChips);

module.exports = router;
