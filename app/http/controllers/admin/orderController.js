const Order = require("../../../model/order");

function adminController() {
  return {
    index(req, res) {
      Order.find({ status: { $ne: "completed" } }, null, {
        sort: { createdAt: -1 },
      })
        .populate("customerId", "-password") //["-password", "-username", "-name"]
        .exec((err, orders) => {
          if (req.xhr) {
            return res.json(orders);
          }

          return res.render("admin/index");
        });
    },
  };
}

module.exports = adminController;
