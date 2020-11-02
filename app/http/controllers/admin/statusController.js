const Order = require("../../../model/order");

function statusController() {
  return {
    update(req, res) {
      const { orderId, status } = req.body;
      Order.updateOne({ _id: orderId }, { status: status }, (err, data) => {
        if (err) {
          return res.redirect("/admin/orders");
        }
        return res.redirect("/admin/orders");
      });
    },
  };
}

module.exports = statusController;
