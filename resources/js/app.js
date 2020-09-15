// import axios from 'axios'
const axios = require('axios');
const cartController = require('../../app/http/controllers/cartController');

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCount = document.querySelector('#cartCount')

function updateCart(coffee) {
    axios.post('/update-cart',coffee).then( res => {
        console.log(res) 
        cartCount.innerHTML = res.data.totalQty
    })
    .catch(err => console.log(err)) 
}


addToCart.forEach( (btn) =>{

    btn.addEventListener('click', (e) =>{
        let coffee = JSON.parse(btn.dataset.menu)
        updateCart(coffee)
    })
})