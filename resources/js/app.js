import axios from "axios";
import Noty from "noty";
// const axios = require('axios');
// const cartController = require('../../app/http/controllers/cartController');

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCount = document.querySelector("#cartCount");

function updateCart(coffee) {
  // console.log(coffee)
  axios
    .post("/update-cart", coffee)
    .then((res) => {
      //   console.log(res);
      cartCount.innerHTML = res.data.totalQty;
      new Noty({
        // theme: "relax",
        timeout: 1000,
        type: "success",
        text: "Đã thêm vào giỏ hàng!",
        progressBar: false,
      }).show();
    })
    .catch((err) => console.log(err));
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", () => {
    let coffee = JSON.parse(btn.dataset.menu);
    console.log(coffee);
    updateCart(coffee);
  });
});

// Remove alert after x seconds
const alertMessage = document.querySelector("#success-message");
if (alertMessage) {
  setTimeout(() => {
    alertMessage.remove();
  }, 3000);
}
