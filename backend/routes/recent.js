var express = require('express');
var router = express.Router();
const {getRecentNotices,setRecentNotices,getAbout,getRecentEvents,setRecentEvents} = require('../route_handles/recentHandle');
const {RecentEventUpLoad} = require('../multer/index');
const { authenticateJWT } = require('../jwt/index.js');


/* GET home page. */
router.get('/getNotices', getRecentNotices);
router.post('/setNotices', authenticateJWT, setRecentNotices);
router.get('/getAbout', getAbout);
router.get('/getEvents', getRecentEvents);
router.post('/setEvents', authenticateJWT,RecentEventUpLoad, setRecentEvents);

module.exports = router;
