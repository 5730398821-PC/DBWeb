///
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var user = { // This a hard-coded user
            _id: 1,
            username: 'Junior',
            email: 'pitchayut.jr@hotmail.com',
            password: '000777'
        };

//
app.use(flash());
//...
app.use(session({ cookie: { maxAge: 60000 },
                  secret: 'woot',
                  resave: false,
                  saveUninitialized: false}));

passport.use('login', new LocalStrategy(
              function(username, password, done) {
                // This should check again db
                if(username === user.username && password === user.password) {
                    return done(null, user);
                  }else {
                    done(null, false, { message: 'Invalid username and password.' });
                  }
                }));

// passport.use(new LocalStrategy({
//     username: 'username',
//     password: 'passwd',
//     passReqToCallback : true
//   },
//   function(req,username, password, done) {
//     if(username == 'Junior' && password == '000777'){
//       return done(null, user);
//     }else{
//       return done(null, false, { message: 'Incorrect Username or Password' });
//     }
//   }
// ));

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

passport.initialize()

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
