var express = require('express');
var router = express.Router();
const {getRecentComments} = require('../route_handles/recentHandle');
/* GET home page. */
router.get('/comments', getRecentComments);


module.exports = router;
