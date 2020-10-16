const Order = require("../../../model/order");
function orderController() {
  return {
    store(req, res) {
      const { phone, address, note } = req.body;
      if (!phone || !address) {
        req.flash("error", "Phone and address can't be empty");
        res.redirect("/cart");
      }
      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address,
        note: note,
      });
      order.save().then((ok) => {
        req.flash("success", "Order placed successfully");
        res.redirect("/customer/orders");
      });
    },
    async historyOrder(req, res) {
      const orders = await Order.find({ customerId: req.user._id });
      res.render("customers/orders", { orders: orders.reverse() });
    },
  };
}

module.exports = orderController;
