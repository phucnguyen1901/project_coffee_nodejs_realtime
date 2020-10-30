const Order = require("../../../model/order");
const moment = require("moment");
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
        delete req.session.cart;
        res.redirect("/customer/orders");
      });
    },
    async historyOrder(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      // or orders.reverse()
      // Not Display Message when back 
      res.header(
        "Cache-Control",
        "no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0"
      );
      res.render("customers/orders", { orders: orders, moment: moment });
    },
  };
}

module.exports = orderController;
