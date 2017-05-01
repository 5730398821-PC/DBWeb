var express = require('express');
var router = express.Router();
var globals = require('../globals.js')
var db = require('../db.js')
var async = require('async')

/* GET users listing. */
router.get('/', function(req, res, next) {

  db.query(
    //'SELECT ' + req.body.username + ' * FROM Company.employee',
    'select id,fname,lname,gpax,year,cmw from((select S.id, S.fname, S.lname, S.gpax, S.status, (2017 - S.enrolled_year) as year from student S join (select A.Student_id from advices A where A.Instructor_id = "' + globals.user.tid + '") A on A.Student_id = S.id) Y left join (select A.Student_id, sum(A.credit) as cmw from (select E.Course_id, E.Student_id, C.credit from evaluation E join course C on E.Course_id = C.id) A group by (A.Student_id)) X on Y.id = X.Student_id )',
    //'select id,fname,lname,gpax,year,cmw from((select S.id, S.fname, S.lname, S.gpax, (2017 - S.enrolled_year) as year from student S join (select A.Student_id from advices A where A.Instructor_id = "' + globals.user.tid + '") A on A.Student_id = S.id) Y left join (select A.Student_id, sum(A.credit) as cmw from (select E.Course_id, E.Student_id, C.credit from evaluation E join course C on E.Course_id = C.id) A group by (A.Student_id)) X on Y.id = X.Student_id)',
    function(err, rows, fields) {
      if (err) {
        return;
      }else{
        console.log(rows);
        res.render('advisor', {
          data: rows
        });

      }
    }
  );
});

router.get('/student', function(req, res, next) {
  res.render('student');
});

router.post('/student', function(req, res, next) {


    var query1 = `select * from (select id,fname,lname,(2017 - enrolled_year) as year, sex, curriculum, gpax, status, address, email, tel_no, birthdate, disease from student where id =   ${req.body.sid}  ) A join Study S on S.Student_id = A.id;`
    var query2 = `select award_name, contest, institute from award where sid =  ${req.body.sid} ;`
    var query3 = `select absent_date, absent_type, reason, Student_id as sid from absent where Student_id =   ${req.body.sid} ;`
    var query4 = `select cid, course_name, term, grade, credit from (select Course_id as cid, concat(academic_year, "/", semester) as term, grade from evaluation where Student_id =   ${req.body.sid}  ) A join course C on C.id = A.cid where term = "2015/1"`

    var return_data = {}

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
         }
      ], function(err) {
           if (err) console.log(err);
           else{
             console.log(return_data.table1);
             console.log(return_data.table2);
             console.log(return_data.table3);
             console.log(return_data.table4);
             res.render('student', {data: return_data})
           }
      });
});

router.post('/query', function(req, res, next) {

  var year = req.body.year;
  var status = req.body.status;
  if(year == '0'){
    if (status == "all"){
      var query = 'select id,fname,lname,gpax,year,cmw from((select S.id, S.fname, S.lname, S.gpax, S.status, (2017 - S.enrolled_year) as year from student S join (select A.Student_id from advices A where A.Instructor_id = "' + globals.user.tid + '") A on A.Student_id = S.id) Y left join (select A.Student_id, sum(A.credit) as cmw from (select E.Course_id, E.Student_id, C.credit from evaluation E join course C on E.Course_id = C.id) A group by (A.Student_id)) X on Y.id = X.Student_id )'
    }else{
      var query = 'select id,fname,lname,gpax,year,cmw from((select S.id, S.fname, S.lname, S.gpax, S.status, (2017 - S.enrolled_year) as year from student S join (select A.Student_id from advices A where A.Instructor_id = "' + globals.user.tid + '") A on A.Student_id = S.id) Y left join (select A.Student_id, sum(A.credit) as cmw from (select E.Course_id, E.Student_id, C.credit from evaluation E join course C on E.Course_id = C.id) A group by (A.Student_id)) X on Y.id = X.Student_id ) where status = "' + status + '"'
    }
  }else{
    if (status == "all"){
      var query = 'select id,fname,lname,gpax,year,cmw from((select S.id, S.fname, S.lname, S.gpax, S.status, (2017 - S.enrolled_year) as year from student S join (select A.Student_id from advices A where A.Instructor_id = "' + globals.user.tid + '") A on A.Student_id = S.id) Y left join (select A.Student_id, sum(A.credit) as cmw from (select E.Course_id, E.Student_id, C.credit from evaluation E join course C on E.Course_id = C.id) A group by (A.Student_id)) X on Y.id = X.Student_id ) where year = "' + year + '"'
    }else{
      var query = 'select id,fname,lname,gpax,year,cmw from((select S.id, S.fname, S.lname, S.gpax, S.status, (2017 - S.enrolled_year) as year from student S join (select A.Student_id from advices A where A.Instructor_id = "' + globals.user.tid + '") A on A.Student_id = S.id) Y left join (select A.Student_id, sum(A.credit) as cmw from (select E.Course_id, E.Student_id, C.credit from evaluation E join course C on E.Course_id = C.id) A group by (A.Student_id)) X on Y.id = X.Student_id ) where status = "' + status + '" && year = "' + year + '"'
    }

  }
  db.query(query, function(err, rows, fields) {
                    if (err) {
                      return;
                    }else{
                      console.log(rows);
                      res.send(rows)
                  }
                }
            );

});

router.post('/query2', function(req, res, next) {

  var sid = req.body.sid;
  var query =  `select E.Student_id, concat(E.academic_year, '/' , E.semester ) as Term , avg(E.grade) as gpax
                from evaluation E
                where Student_id = ${sid}
                group by E.Student_id, E.semester, E.academic_year
                order by concat(E.academic_year, '/' , E.semester );`

  db.query(query, function(err, rows, fields) {
                    if (err) {
                      return;
                    }else{
                      console.log(rows);
                      res.send(rows)
                  }
                }
            );

});


module.exports = router;
