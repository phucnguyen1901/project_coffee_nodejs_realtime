const Order = require("../../../model/order");
const moment = require("moment");
function orderApi() {
  return {
    store(req, res) {
      const { phone, address, note , customerId, itemCart} = req.body;
      if (!phone || !address) {

        return res.json({"message": "Order Unsuccessfully"});
      }
      const order = new Order({
        customerId: customerId,
        items: itemCart,
        phone: phone,
        address: address,
        note: note,
      });
      order.save().then((ok) => {
        delete req.session.cart;
        Order.populate(ok, { path: "customerId" }, (err, data) => {
          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("addOrder", data);
        });
        return res.json({"message": "Order successfully"});
        // res.redirect("/customer/orders");
      });
    },
    async historyOrder(req, res) {

      const orders = await Order.find({ customerId: req.params.id }, null, {
        sort: { createdAt: -1 },
      });

      res.json({ orders: orders, moment: moment})
      // or orders.reverse()
      // Not Display Message when back
      // res.header(
      //   "Cache-Control",
      //   "no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0"
      // );
      // res.render("customers/orders", { });
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

module.exports = orderApi;
