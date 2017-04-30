var express = require('express');
var router = express.Router();
var db = require('../db.js')
var async = require('async')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query1 = 'select A.year, count(A.year) as numStudent, avg(A.gpax) as avgGPAX from (select (2017-S.enrolled_year) as year, S.gpax from Student S where S.curriculum = "วิศวกรรมคอมพิวเตอร์") A group by A.year;'
  var query2 = 'select (2017 - S.enrolled_year) as year, count(S.id) as numStudent from Student S where S.status = "แลกเปลี่ยนต่างประเทศ" group by year;'
  var query3 = 'select A.award_name, A.contest, A.institute from award A;'
  var query4 = 'select T.graderange, T.year, count(T.gpax) as num from (select case when A.gpax <= 2 then "<= 2.00" when A.gpax > 2 and A.gpax <= 3 then "2.01 - 3.00" when A.gpax  > 3 and A.gpax <= 4 then "3.01 - 4.00" end as graderange, A.year, A.gpax from (select (2017-S.enrolled_year) as year, S.gpax from student S) A ) T group by  T.graderange, T.year;'
  var query5 = 'select T.graderange, T.year, count(T.gpax) as num from (select case when A.gpax < 2.5 then "< 2.5" when A.gpax >= 2.5 and A.gpax <= 3.2 then "between" when A.gpax > 3.2 then ">3.2" end as graderange, A.year, A.gpax from (select (2017-S.enrolled_year) as year, S.gpax from student S) A ) T group by  T.graderange, T.year;'

  var return_data = {};

  async.parallel([
       function(parallel_done) {
           db.query(query1, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table1 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           db.query(query2, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table2 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           db.query(query3, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table3 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           db.query(query4, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table4 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           db.query(query5, {}, function(err, results) {
               if (err) return parallel_done(err);
               return_data.table5 = results;
               parallel_done();
           });
       }
    ], function(err) {
         if (err) console.log(err);
         else{
           console.log(return_data.table1);
           console.log(return_data.table2);
           console.log(return_data.table3);
           console.log(return_data.table4);
           console.log(return_data.table5);
           res.render('executive', { data: return_data });
         }
    });
});


module.exports = router;
