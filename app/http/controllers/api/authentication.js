const User = require("../../../model/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { session } = require("passport");

function authApi() {
//   const _getRedirectUrl = (req) => {
//     return req.user.role === "admin" ? "/admin/orders" : "/cart";
//   };
  return {

     login(req, res, next) {
      const { username, password } = req.body;
      console.log(req.body);
      if (!username || !password) {
        req.flash("error", "All fields are required");
        req.flash("username", username);
        return res.json(null);
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.json(null)
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return res.redirect("/");
          }
          return res.json({user})
        });
      })(req, res, next);
    },

    async register(req, res) {
      const { name, username, password } = req.body;
      console.log(req.body);
      if (!name || !username || !password) {
        return  res.json(null)
      }
      //   Check exist
      User.exists({ username: username }, (err, data) => {
        if (data) {
          return  res.json(null)
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
        .then((user) => res.json({"message": "Register successfully"}))
        .catch((req) => {
          return res.json(null);
        });
        
    },

    logoutUser(req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = authApi;
