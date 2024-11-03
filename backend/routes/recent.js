var express = require('express');
var router = express.Router();
const {getRecentNotices,setRecentNotices,getAbout,getRecentEvents,setRecentEvents} = require('../route_handles/recentHandle');
const {RecentEventUpLoad} = require('../multer/index');
/* GET home page. */
router.get('/getNotices', getRecentNotices);
router.post('/setNotices', setRecentNotices);
router.get('/getAbout', getAbout);
router.get('/getEvents', getRecentEvents);
router.post('/setEvents',RecentEventUpLoad, setRecentEvents);

module.exports = router;
