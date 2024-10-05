var express = require('express');
const {getBlogs, getPoetry,addPoetry,delPoetry} = require("../route_handles/artsHandle");

var router = express.Router();


router.get('/blogs', getBlogs);
router.get('/poetry', getPoetry);
router.post('/poetry/add', addPoetry);
router.delete('/poetry/:id', delPoetry);

module.exports = router;
