// import { axios } from "axios";
// import { moment } from "moment";
const axios = require("axios");
const moment = require("moment");
function initAdmin(socket) {
  const orderTableBody = document.querySelector("#orderTableBody");
  let orders = [];
  let markup;
  axios
    .get("/admin/orders"
    // , {
    //   headers: {
    //     "X-Requested-With": "XMLHttpRequest",
    //   },
    // }
    )
    .then((res) => {
      orders = res.data;
      // if (typeof order === "object") {
      // markup = generateMarkup(orders);
      // orderTableBody.innerHTML = markup;
      // }
    })
    .catch((err) => {
      console.log(err);
    });

  function renderItems(object) {
    let parsedItems = Object.values(object);
    // console.log("render"+parseItems)
    return parsedItems
      .map((menuItem) => {
        return `
      <p>${menuItem.item.name} - ${menuItem.qty}</p>
      `;
      })
      .join("");
  }

  function generateMarkup(orders) {
    return orders
      .map((order) => {
        return `      <tr>
        <td class="border px-4 py-2 text-blue-500 hover:text-pink-500">
          <a href=""> ${order._id}</a>
        </td>
        <td class="border px-4 py-2"> ${renderItems(order.items.items)}</td>
        <td class="border px-4 py-2"> ${order.address}</td>
        <td class="border px-4 py-2">0${order.phone}</td>
        <td class="border px-4 py-2"> ${order.note}</td>
        <td class="border px-4 py-2">
        <form action="/admin/orders/status" method="POST">
          <input type="hidden" name="orderId" value="${order._id}" />
          <select name="status" onchange="this.form.submit()">
            <option value="order_placed"
              ${
                order.status === "order_placed" ? "selected" : ""
              }>Order_Placed</option>
            </option>
            <option value="confirmed"
              ${
                order.status === "confirmed" ? "selected" : ""
              }>Confirmed</option>
            </option>
            <option value="delivered"
              ${
                order.status === "delivered" ? "selected" : ""
              }>Delivered</option>
            </option>
            <option value="completed"
              ${
                order.status === "completed" ? "selected" : ""
              }>Completed</option>
            </option>
          </select>
        </form>
        </td>
        <td class="border px-4 py-2"> ${moment(order.createdAt).format(
          "LLLL"
        )}</td>
      </tr>`;
      })
      .join("");
  }

  // add Order
  socket.on("addOrder", (data) => {
    orders.unshift(data);
    orderTableBody.innerHTML = generateMarkup(orders);
  });
}

module.exports = initAdmin;
