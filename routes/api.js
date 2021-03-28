// const homeController = require("../app/http/controllers/homeController");
// const authController = require("../app/http/controllers/customers/authController");
// const orderController = require("../app/http/controllers/customers/orderController");
// const cartController = require("../app/http/controllers/cartController");
const apiCart = require("../app/http/controllers/api/cart");
const apiHome = require("../app/http/controllers/api/home");
const authApi = require("../app/http/controllers/api/authentication");
const orderApi = require("../app/http/controllers/api/order");


// const statusController = require("../app/http/controllers/admin/statusController");
// const guest = require("../app/http/middleware/guest");
// const auth = require("../app/http/middleware/auth");
// const admin = require("../app/http/middleware/admin");

function apiRoute(app) {

  app.get("/api/cart",apiCart().cart);
  app.post("/api/updateCart",apiCart().updateCart);
  app.delete("/api/removeCart/:id",apiCart().removeCart);
  app.get("/api/home",apiHome().home);
  app.post("/api/login",authApi().login);
  app.post("/api/register",authApi().register);

  app.post("/api/order",orderApi().store);
  app.get("/api/historyOrder/:id",orderApi().historyOrder);
  // app.post("/api/register",authApi().register);

}

module.exports = apiRoute;
