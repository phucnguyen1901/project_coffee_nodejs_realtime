const User = require("../../model/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { session } = require("passport");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      const { username, password } = req.body;
      console.log(req.body);
      if (!username || !password) {
        req.flash("error", "All fields are required");
        req.flash("username", username);
        return res.redirect("/login");
      } else {
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          if (!user) {
            req.flash("error", info.message);
            return res.redirect("/login");
          }
          req.logIn(user, (err) => {
            if (err) {
              req.flash("error", info.message);
              return res.redirect("/");
            }
            return res.redirect("/");
          });
        })(req, res, next);
      }
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, username, password } = req.body;
      console.log(req.body);
      if (!name || !username || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("username", username);
        return res.redirect("/register");
      }
      //   Check exist
      User.exists({ username: username }, (err, data) => {
        if (data) {
          req.flash("error", "Username is exist");
          req.flash("name", name);
          req.flash("username", username);
          return res.redirect("/register");
        }
      });

      //   Hash password
      const hashPassword = await bcrypt.hash(password, 10);
      //    Create User
      const user = new User({
        name: name,
        username: username,
        password: hashPassword,
      });
      user
        .save()
        .then((user) => res.redirect("/cart"))
        .catch((req) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
    },

    logoutUser(req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = authController;
