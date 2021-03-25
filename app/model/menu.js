
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: {type:String , require: true},
    img: {type:String , require: true},
    price: {type:Number , require: true},
    size: {type: Array , require: true}
})

module.exports  = mongoose.model('Menu', menuSchema)

