const express = require("express");

require('dotenv').config()
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const initRoute = require("./routes/web");
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const session = require('express-session');
// const { MongoStore } = require("connect-mongo");
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session)


mongoose.connect(
  "mongodb://localhost/coffee",
  {useNewUrlParser:true , useUnifiedTopology: true }
)
const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database is OK")
}).catch( err=>{
  console.log('Connect fail')
})

//Session store 
let mongoStore = new MongoDbStore({
  mongooseConnection:db,
  collection: 'sessions'
})


// Session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: {maxAge : 1000 * 60 * 60 }
}))

app.use(flash())


// set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

// asset
app.use(express.static('public'))
app.use(express.json())
// require('./routes/web')(app)
initRoute(app)

app.listen(port, ()=> console.log("Server was stated with port "+port))
