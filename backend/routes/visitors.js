const {visitorApplication, visitorLogin,visitorRegister,getVisitorProfile,updateVisitorProfile} = require('../route_handles/visitorsHandle');

var express = require('express');
var router = express.Router();

router.post('/application', visitorApplication);

router.post('/login', visitorLogin);

router.post('/register', visitorRegister);

router.get('/profile', getVisitorProfile);

router.post('/profile', updateVisitorProfile);

module.exports = router;