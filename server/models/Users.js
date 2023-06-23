const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')


const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String, 
    userName : String,
    email : String, 
    password : String,
    isAdmin : Boolean,
    cart : [{
        productName : String,
        productPrice : Number,
        quantity : Number
    }]
})

const User = mongoose.model("users", userSchema)
module.exports = User