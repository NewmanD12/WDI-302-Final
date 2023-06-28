const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    background_color : String,
    subscription_available : Boolean,
    star_rating : Number,
    productBreakdown : [{
        size : String,
        price: Number,
        category: String,
        quantity : Number
    }],
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