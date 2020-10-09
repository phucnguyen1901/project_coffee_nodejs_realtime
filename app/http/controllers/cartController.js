
function cartController(){
    
    return {
        cart(req,res){
            res.render('customers/cart')
        },
        updateCart(req,res){
            
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0,
                }
            } 
            let cart = req.session.cart
            // if(!cart.items[req.body._id]){
            if(!(req.body._id in cart.items)){
                cart.items[req.body._id] = {
                    item : req.body,
                    qty: 1
                }
                cart.totalQty += 1
                cart.totalPrice += req.body.price 
            }else{
                cart.items[req.body._id].qty += 1
                cart.totalQty += 1
                cart.totalPrice += req.body.price
            }

            return res.json({ totalQty: cart.totalQty , totalPrice: cart.totalPrice})
        }
    }
}

module.exports = cartController