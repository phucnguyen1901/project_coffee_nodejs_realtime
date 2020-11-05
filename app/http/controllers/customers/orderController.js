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
        Order.populate(ok, { path: "customerId" }, (err, data) => {
          req.flash("success", "Order placed successfully");
          delete req.session.cart;
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("addOrder", data);
        });
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

    async show(req, res) {
      const order = await Order.findById(req.params.id);
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", { order: order });
      }
      return res.render("customers/singleOrder", { order: 1 });
    },
  };
}

module.exports = orderController;
