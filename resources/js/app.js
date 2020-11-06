import axios from "axios";
import Noty from "noty";
// import { initAdmin } from "./admin";
import moment from "moment";
import { updateOne } from "../../app/model/menu";
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
  const nav = document.getElementById("nav");

  if (scrollY >= 160) {
    menu.style.position = "fixed";
    nav.style.height = "70px";
    menu.style.top = "0px";
    menu.style.width = "100%";
    menu.style.backgroundColor = "white";
  }
  if (scrollY == 0) {
    menu.style.position = "relative";
    nav.style.height = "95px";
  }
});

let order = document.querySelector("#Order")
  ? document.querySelector("#Order").value
  : null;
order = JSON.parse(order);
let Statuses = document.querySelectorAll(".status-line");
let time = document.createElement("small");

function updateStatus(order) {
  Statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });
  let condition = true;
  Statuses.forEach((st) => {
    let data = st.dataset.status;
    if (condition === true) {
      if (data === order.status) {
        st.classList.add("current");
        time.innerHTML = moment(order.updatedAt).format("LLLL");
        st.appendChild(time);
        condition = false;
      } else {
        st.classList.add("step-completed");
      }
    }
  });
}

updateStatus(order);

let socket = io();
if (order) {
  socket.emit("join", `order_${order._id}`);
}

socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment(data.updatedAt).format("LLLL");
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
});

let adminPath = window.location.pathname;
if (adminPath.includes("admin")) {
  initAdmin(socket);
  socket.emit("join", "adminRoom");
}
