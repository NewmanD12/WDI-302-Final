const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    category: String,
    background_color : String,
    subscription_available : Boolean,
    star_rating : Number,
    available_product : Number,
    size : String,
    reviews : [
        {
            text : String,
            rating : Number,
            creatorID : String,
            createdAt : String
        }
    ]
})


const Product = mongoose.model('products', productSchema)

module.exports = Product