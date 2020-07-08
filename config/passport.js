var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  function(email, password, done) {
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


module.exports = passport;




// Our user will create a login with an email. If there isn't a user configured with the input email, it sends an error message.
// When the user uses the correct email login, it then asks for a password. If the password is wrong, it sends an error message.

// serialize creates a serial number for user logins so that not any two logins are happen to use the same id- and the user keeps their
// individualized authentication state across the application