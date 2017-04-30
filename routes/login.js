var express = require('express');
var router = express.Router();
var db = require('../db.js');
var globals = require('../globals.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { wrong: false });
});

router.post('/',
  // auth.authenticate('login', { successRedirect: '/profile',
  //                                  failureRedirect: '/login',
  //                                  failureFlash: true})
  function(req,res, next){

    db.query(
      //'SELECT ' + req.body.username + ' * FROM Company.employee',
      'SELECT I.fname, I.lname, C.type, C.tid '+
      'FROM CUReg.login C join instructor I on I.id = C.tid ' +
      'where C.username = "' + req.body.username + '" && C.password = "' + req.body.password + '" ',
      function(err, rows, fields) {
        if (err) {
          return next(err);
        }else{
          authen = (rows.length > 0)
          console.log(rows);
        }
        if(authen){
          req.session.profile_name = rows[0].fname + '  ' + rows[0].lname;
          globals.user.fname = rows[0].fname
          globals.user.lname = rows[0].lname
          globals.user.type = rows[0].type
          globals.user.tid = rows[0].tid
          res.redirect('/profile')
        }else{
          res.render('login', {wrong: true});
        }
      }
    );
  }
);


module.exports = router;
