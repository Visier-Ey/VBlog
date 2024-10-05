const profilesHandle = require('../route_handles/usersHandle').profilesHandle;
const usersHandle = require('../route_handles/usersHandle').usersHandle;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// deal with the request of /profiles
router.get('/profiles', profilesHandle);

// deal with the request of /users
router.get('/user', usersHandle);






module.exports = router;
