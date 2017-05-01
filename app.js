var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var executive = require('./routes/executive');
var query = require('./routes/query');
var login = require('./routes/login');
var login_injection = require('./routes/login_injection');
var profile = require('./routes/profile');
var advisor = require('./routes/advisor')
var student = require('./routes/student')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//for passport
var session = require('express-session');
var flash = require('connect-flash');
var auth = require('./auth.js');


app.use(session({
        secret: 'some-secret',
        saveUninitialized: false,
        resave: true,
        cookie: { maxAge: 60000 }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tells app to use password session
app.use(auth.initialize());
app.use(auth.session());

app.use(flash());
///End line


app.use('/', index);
app.use('/executive', executive);
app.use('/query', query);
app.use('/profile', profile);
app.use('/login', login);
app.use('/login_injection', login_injection);
app.use('/advisor', advisor);
// app.use('/advisor/student', student)


//login form
// var db = require('./db.js');

// app.post('/login',
//   // auth.authenticate('login', { successRedirect: '/profile',
//   //                                  failureRedirect: '/login',
//   //                                  failureFlash: true})
//   function(req,res, next){
//     var username;
//     var password;
//     db.query(
//       //'SELECT ' + req.body.username + ' * FROM Company.employee',
//       'SELECT I.fname, I.lname '+
//       'FROM CUReg.login C join instructor I on I.id = C.tid ' +
//       'where C.username = "' + req.body.username + '" && C.password = "' + req.body.password + '" ',
//       function(err, rows, fields) {
//         if (err) {
//           return next(err);
//         }else{
//           authen = (rows.length > 0)
//           console.log(rows);
//         }
//         if(authen){
//           req.session.profile_name = rows[0].fname + '  ' + rows[0].lname;
//           res.redirect('/profile')
//         }else{
//           res.render('login', {wrong: true});
//         }
//       }
//     );
//   }
// );



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
