const {visitorApplication, visitorLogin} = require('../route_handles/visirorsHandle');

var express = require('express');
var router = express.Router();

router.post('/application', visitorApplication);

router.post('/login', visitorLogin);

module.exports = router;