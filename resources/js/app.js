import axios from "axios";
import Noty from "noty";
// import { initAdmin } from "./admin";
const initAdmin = require("./admin");
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

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const menu = document.getElementById("menu");
  console.log(scrollY);
  if (scrollY >= 120) {
    console.log("=0");
    menu.style.position = "fixed";
    menu.style.top = "0px";
    menu.style.width = "100%";
    menu.style.backgroundColor = "white";
  }
  if (scrollY == 0) {
    menu.style.position = "relative";
  }
});

// console.log(initAdmin);
initAdmin();
