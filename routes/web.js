const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/customers/authController");
const orderController = require("../app/http/controllers/customers/orderController");
const cartController = require("../app/http/controllers/cartController");
const adminController = require("../app/http/controllers/admin/orderController");
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");

function initRoute(app) {
  app.get("/", homeController().index);

  app.get("/login", guest, authController().login);

  app.post("/login", authController().postLogin);

  app.post("/logout", authController().logoutUser);

  app.get("/register", guest, authController().register);

  app.post("/register", authController().postRegister);

  app.get("/cart", cartController().cart);

  app.post("/update-cart", cartController().updateCart);

  app.post("/orders", auth,orderController().store);

  app.get("/customer/orders", auth, orderController().historyOrder);

  //admin
  app.get("/admin/orders", adminController().index);
}

module.exports = initRoute;
