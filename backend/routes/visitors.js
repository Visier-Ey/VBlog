const {visitorApplication, visitorLogin,visitorApplicationApprove,updateVisitorProfile} = require('../route_handles/visitorsHandle');

var express = require('express');
var router = express.Router();

router.post('/application', visitorApplication);

router.post('/login', visitorLogin);

router.get('/register', visitorApplicationApprove);

router.post('/profile', updateVisitorProfile);

module.exports = router;