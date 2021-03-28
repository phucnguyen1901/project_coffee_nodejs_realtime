

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
          qty:  req.body.qty,
        };
        cart.totalQty +=  req.body.qty;
        cart.totalPrice += req.body.price*req.body.qty;
      } else {
        cart.items[req.body._id].qty +=  req.body.qty;
        cart.totalQty += req.body.qty;
        cart.totalPrice += req.body.price *req.body.qty;
      }
      //   console.log(req.session.cart);
    //   for (const el in req.session.cart.items) {
    //     const coffee = req.session.cart.items[el].item;
    //   }
    //   return res.json({ totalQty: cart.totalQty, totalPrice: cart.totalPrice });
      return res.json(req.session.cart);
    },
    removeCart(req,res){
      const idItem = req.params.id;
      console.log(idItem);
      console.log(typeof idItem);
      let totalQty =  req.session.cart.items[idItem]["qty"];
      let totalPrice =  req.session.cart.items[idItem]["item"]["price"];
      req.session.cart.totalQty -= totalQty;
      req.session.cart.totalPrice -= totalPrice * totalQty;;
      delete req.session.cart.items[idItem];
      return res.json(req.session.cart);
    }
  };
}

module.exports = apiCart;