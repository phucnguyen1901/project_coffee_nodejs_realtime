const express = require("express");

const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.render('home')
})

// set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')


app.listen(port, ()=> console.log("Server was stated with port "+port))
