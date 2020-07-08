var db = require("../models");
var passport = require("../config/passport");
const { not, in } = require("sequelize/types/lib/operators");
const user = require("../models/user");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};





// on the login page, the passport authentication is used to check if the user has valid login credentials
// if true, they are sent to the next page. and if not, they are sent an error

// the signup page is basic login info- but takes into account the model for our user we already set up earlier-
// the password is hashed and stored securely, and if the user is created successfully we proceed to log the user in
// if not, they are sent an error

// the logout route redirects them to the main page

// the user_data route is used to retrieve data we have stored about our user (user email and id)