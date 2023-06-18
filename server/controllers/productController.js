const Product = require('../models/Products')

async function createProduct(req, res) {
    try {
        

        // console.log('create-product')
        const name = req.body.name
        const description = req.body.description
        const price = req.body.price
        const sizes = req.body.sizes
        const subscription_available = req.body.subscription_available
        const reviews = req.body.reviews

        const newProduct = new Product({
            name,
            description,
            price,
            sizes,
            subscription_available, 
            reviews
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