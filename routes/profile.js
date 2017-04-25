var express = require('express');
var router = express.Router();

///for database
var db = require('../db.js');
var data;

/* GET home page. */
router.get('/', function(req, res, next) {

  db.query(
    'SELECT * FROM Company.employee',
    function(err, rows, fields) {
      if (err) {
        return next(err);
      }
      console.log(rows);
      console.log(rows[0].Fname);
      res.render('profile', {data: rows[0].Fname});
    }
  );

});


module.exports = router;
