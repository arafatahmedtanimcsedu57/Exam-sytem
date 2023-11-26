const config = require("config");
const bcrypt = require("bcrypt");
const passport = require("passport");

const saltRounds = 10;

const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const UserModel = require("../models/user");

//user login local strategy
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "emailId",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, emailId, password, done) {
      UserModel.findOne({ emailId: emailId, status: true }, function (
        err,
        user
      ) {
        if (err) {
          return done(err, false, {
            success: false,
            message: "Server Error",
          });
        }
        if (!user) {
          return done(null, false, {
            success: false,
            message: "Invalid email",
          });
        } else {
          bcrypt.compare(password, user.password).then(function (res) {
            if (res) {
              return done(null, user, {
                success: true,
                message: "Logged in successfully",
              });
            } else {
              return done(null, false, {
                success: false,
                message: "Invalid Password",
              });
            }
          });
        }
      });
    }
  )
);

//options jwt
var opts = {};

opts.secretOrKey = config.get("jwt.secret");
opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");

passport.use(
  "user-token",
  new JwtStrategy(opts, function (jwtPayload, done) {
    UserModel.findById(jwtPayload._id, function (err, user) {
      if (err)
        return done(err, false, {
          success: false,
          message: "Server Error",
        });

      if (user)
        return done(null, user, {
          success: true,
          message: "Successfull",
        });
      else
        return done(null, false, {
          success: false,
          message: "Authentication Failed",
        });
    });
  })
);

module.exports = passport;
