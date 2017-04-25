var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('advisor');
});

router.get('/student', function(req, res, next) {
  res.render('student');
});


module.exports = router;
