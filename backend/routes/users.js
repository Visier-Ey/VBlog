const {getUsersInfo, revisionUserInfo} = require('../route_handles/usersHandle');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// deal with the request of /profiles

// deal with the request of /users
router.get('/get', getUsersInfo);

router.post('/revision', revisionUserInfo);


module.exports = router;
