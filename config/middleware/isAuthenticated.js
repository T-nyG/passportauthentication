module.exports = function(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.redirect("/");
};



// restricting routes a user is not allowed to visit if not logged in, they get returned to the login page
// if the user is logged in, continue with the request to the restricted route