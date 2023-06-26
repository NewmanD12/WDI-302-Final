const Product = require('../models/Products')

async function createProduct(req, res) {
    try {
        const name = req.body.name
        const description = req.body.description
        const price = req.body.price
        const category = req.body.category
        const size = req.body.size
        const subscription_available = req.body.subscription_available
        const available_product = req.body.available_product
        const background_color = req.body.background_color

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            size,
            subscription_available, 
            available_product, 
            background_color
        })

        const savedProduct = await newProduct.save()

        res.json({
            success : true,
            project : savedProduct
        })



    } catch (error) {
        res.json({
            success : false,
            error : error 
        })
    }
}

const allProducts = async (req, res) => {

    try {
        
        const allProducts = await Product.find({})
        res.json({
            success: true,
            products : allProducts
        })

    } catch (error) {
        console.log(error)

    }
}


module.exports = {
    createProduct,
    allProducts
}