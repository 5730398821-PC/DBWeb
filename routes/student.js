var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('query')
});

// router.post('/', function(req, res, next) {
//
//   var query1 = 'select * from (select id,fname,lname,(2017 - enrolled_year) as year, sex, curriculum, gpax, status, address, email, tel_no, birthdate, disease from student where id = "' + req.body.sid + '") A join Study S on S.Student_id = A.id;'
//   var query2 = 'select award_name, contest, institute from award where sid = "' + req.body.sid + '";'
//   var query3 = 'select absent_date, absent_type, reason, Student_id as sid from absent where Student_id = "' + req.body.sid + '";'
//   var query4 = 'select cid, course_name, term, grade, credit from (select Course_id as cid, concat(academic_year, "/", semester) as term, grade from evaluation where Student_id = "' + req.body.sid + '") A join course C on C.id = A.cid where term = "2015/1"'
//
//   var return_data = {}
//
//   async.parallel([
//        function(parallel_done) {
//            db.query(query1, {}, function(err, results) {
//                if (err) return parallel_done(err);
//                return_data.table1 = results;
//                parallel_done();
//            });
//        },
//        function(parallel_done) {
//            db.query(query2, {}, function(err, results) {
//                if (err) return parallel_done(err);
//                return_data.table2 = results;
//                parallel_done();
//            });
//        },
//        function(parallel_done) {
//            db.query(query3, {}, function(err, results) {
//                if (err) return parallel_done(err);
//                return_data.table3 = results;
//                parallel_done();
//            });
//        },
//        function(parallel_done) {
//            db.query(query4, {}, function(err, results) {
//                if (err) return parallel_done(err);
//                return_data.table4 = results;
//                parallel_done();
//            });
//        }
//     ], function(err) {
//          if (err) console.log(err);
//          else{
//            console.log(return_data.table1);
//            console.log(return_data.table2);
//            console.log(return_data.table3);
//            console.log(return_data.table4);
//            res.render('student', {data: return_data})
//          }
//     });
// });

module.exports = router;
