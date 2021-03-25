// const homeController = require("../app/http/controllers/homeController");
// const authController = require("../app/http/controllers/customers/authController");
// const orderController = require("../app/http/controllers/customers/orderController");
// const cartController = require("../app/http/controllers/cartController");
const apiCart = require("../app/http/controllers/api/cart");
const apiHome = require("../app/http/controllers/api/home");


// const statusController = require("../app/http/controllers/admin/statusController");
// const guest = require("../app/http/middleware/guest");
// const auth = require("../app/http/middleware/auth");
// const admin = require("../app/http/middleware/admin");

function apiRoute(app) {

  app.get("/api/cart",apiCart().cart);
  app.get("/api/home",apiHome().home);
  app.post("/api/home",apiHome().home);
  app.post("/api/home",apiHome().home);

//   app.get("/contact", homeController().contact);

//   //login ,register and logout
//   app.get("/login", guest, authController().login);

//   app.post("/login", authController().postLogin);

//   app.post("/logout", authController().logoutUser);

//   app.get("/register", guest, authController().register);

//   app.post("/register", authController().postRegister);

//   //cart
//   app.get("/cart", cartController().cart);

//   app.post("/update-cart", cartController().updateCart);

//   // customer
//   app.post("/orders", auth, orderController().store);
//   app.get("/customer/orders", auth, orderController().historyOrder);
//   app.get("/customer/orders/:id", auth, orderController().show);

//   //admin
//   app.get("/admin/orders", admin, adminController().index);
//   app.post("/admin/orders/status", admin, statusController().update);
}

module.exports = apiRoute;
