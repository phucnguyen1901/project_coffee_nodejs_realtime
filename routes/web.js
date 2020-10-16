const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/customers/authController");
const orderController = require("../app/http/controllers/customers/orderController");
const cartController = require("../app/http/controllers/cartController");
const guest = require("../app/http/middleware/guest");

function initRoute(app) {
  app.get("/", homeController().index);

  app.get("/login", guest, authController().login);

  app.post("/login", authController().postLogin);

  app.post("/logout", authController().logoutUser);

  app.get("/register", guest, authController().register);

  app.post("/register", authController().postRegister);

  app.get("/cart", cartController().cart);

  app.post("/update-cart", cartController().updateCart);

  app.post("/orders", orderController().store);

  app.get("/customer/orders", orderController().historyOrder);
}

module.exports = initRoute;

