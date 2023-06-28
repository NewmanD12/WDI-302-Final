const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String, 
    userName : String,
    email : String, 
    password : String,
    isAdmin : Boolean,
    subscriptionList : [{
        productName : String,
        frequency : String,
    }],
    cart : [{
        productName : String,
        productPrice : Number,
        quantity : Number
    }]
})

const User = mongoose.model("users", userSchema)
module.exports = User