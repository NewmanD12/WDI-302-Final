const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    subscription_available : Boolean,
    star_rating : Number,
    sizes : [String],
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