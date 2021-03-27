

function apiCart() {
  return {
    cart(req, res) {
      return res.json(req.session.cart);
    },
    updateCart(req, res) {
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      // if(!cart.items[req.body._id]){
      if (!(req.body._id in cart.items)) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty +=  req.body.qty;
        cart.totalPrice += req.body.price;
      } else {
        cart.items[req.body._id].qty +=  req.body.qty;
        cart.totalQty += req.body.qty;
        cart.totalPrice += req.body.price;
      }
      //   console.log(req.session.cart);
    //   for (const el in req.session.cart.items) {
    //     const coffee = req.session.cart.items[el].item;
    //   }
    //   return res.json({ totalQty: cart.totalQty, totalPrice: cart.totalPrice });
      return res.json(req.session.cart);
    },
  };
}

module.exports = apiCart;