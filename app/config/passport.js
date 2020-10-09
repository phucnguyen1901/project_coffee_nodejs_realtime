const localStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new localStrategy(
      { username: "username" },
      async (username, password, done) => {
        //login
        //check if email exist
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "No user with this username " });
        }
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged in successfully" });
            }
            return done(null, false, { message: "Wrong username or password" });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went error" });
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
}

module.exports = init;
