var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");
const { in, in } = require("sequelize/types/lib/operators");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};




// starts checks to see if user is logged in, and requires path so we have our routes to be used
// if the user has an acccount for the first path, they are sent to the members page, if not they are redirected to signup page

// same thing happens if they reach the /login route and already have a login- they get sent to members page.

// isAuthenticated is used to check to see if the user is logged in. if they are not and somehow have accessed this page, they are redirected to sign up