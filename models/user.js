var bcrypt = require("bcryptjs");
const { sequelize } = require(".");
const { Model } = require("sequelize/types");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};



// bcrypt hashes the user password so no data may be leaked
// sequelize is used here to create our User Model, must be using a proper email and it cannot be null.
// Password is also required-it cannot be null
// bcrypt is used in the function to check if the hashed password matches the unhashed password stored in our database
// Hook is called before the create user model to hash the password as it is being created