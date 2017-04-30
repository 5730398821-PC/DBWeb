var express = require('express');
var router = express.Router();
var db = require('../db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Query')
});

router.post('/', function(req, res, next) {
  var query = 'select cid, course_name, term, grade, credit from (select Course_id as cid, concat(academic_year, "/", semester) as term, grade from evaluation where Student_id = "' + req.body.sid + '") A join course C on C.id = A.cid where term = "' + req.body.term + '"'
  db.query(query, function(err, rows, fields) {
              if (err) {
                return;
              }else{
                console.log(rows);
                res.send(rows)
              }
          });
});

module.exports = router;
