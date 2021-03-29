const Order = require("../../../model/order");
const moment = require("moment");
function adminController() {
  return {
    async index(req, res) {
      let orders =  await Order.find({ status: { $ne: "completed" } })
      .sort({ createdAt: -1 })
      .populate("customerId", "-password");

      return res.render("admin/index",{orders:orders ,moment:moment});
      // return res.json(orders);
      // await Order.find({ status: { $ne: "completed" } }, null, {
      //   sort: { createdAt: -1 },
      // })
      //   .populate("customerId", "-password") //["-password", "-username", "-name"]
      //   .exec((err, orders) => {
      //     if (req.xhr) {
      //       console.log(orders)
      //       return res.json(orders);
      //     }
      //     return res.render("admin/index");
      //   });
    },
      //     index(req, res) {
    //    Order.find({ status: { $ne: "completed" } }).sort({ createdAt: -1 })
    //     .populate("customerId", "-password") //["-password", "-username", "-name"]
    //     .exec((err, orders) => {
    //       if (req.xhr) {
    //         console.log(orders)
    //         return res.json(orders);
    //       }
    //       return res.render("admin/index");
    //     });
    // },
  };
}

module.exports = adminController;
