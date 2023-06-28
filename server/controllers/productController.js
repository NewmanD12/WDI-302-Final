const Product = require('../models/Products')

async function createProduct(req, res) {
    
    try {
        const name = req.body.name
        const description = req.body.description
        const price = req.body.price
        const category = req.body.category
        const size = req.body.size
        const subscription_available = req.body.subscription_available
        const quantity = req.body.quantity
        const background_color = req.body.background_color

        const product = await Product.findOne({name : name})

        // checks if product already exists
        if(product){

            // getting list of current sizes and categories
            let currentSizes = product.productBreakdown.map((item) => item.size)
            let currentCategories = product.productBreakdown.map((item) => item.category)

            // checks to see if category passed is already present
            // adds the category and all info passed if not present
            if(!currentCategories.includes(category)){
                const fullBreakdown = [...product.productBreakdown, {
                    size,
                    category,
                    quantity,
                    price
                }]
                const updatedProduct = await Product.findByIdAndUpdate(product._id, {
                    productBreakdown : fullBreakdown
                })
            }
             
            // Below is executed if category is already present
            else{

                // looks through productBreakdown and stores current sizes in an array
                let currentSizes = []
                const productsInCategory = product.productBreakdown.filter((prod) =>  prod.category === category)
                productsInCategory.map((prod) => currentSizes.push(prod.size))

                // If the size is is not included, it gets added to the productBreakdown
                if(!currentSizes.includes(size)){
                    const fullBreakdown = [...product.productBreakdown, {
                        size,
                        category,
                        quantity,
                        price
                    }]
                    const updatedProduct = await Product.findByIdAndUpdate(product._id, {
                        productBreakdown : fullBreakdown
                    })
                }
                
                // if the size is already present below code will add input quantity to current quantity
                else {
                    // Finds the product I want to add to 
                    const productToAddTo = product.productBreakdown.filter((prod) => prod.category === category && prod.size === size)[0]

                    // extracts all other products
                    const allOthers = product.productBreakdown.filter((prod) => prod.category !== category || prod.size !== size)

                    // preparing a list of all of the other productBreakdowns and adds the updated information
                    const fullBreakdown = [...allOthers, {
                        size : productToAddTo.size,
                        category : productToAddTo.category,
                        quantity : quantity + productToAddTo.quantity,
                        price : productToAddTo.price
                    }]

                    const updatedProduct = await Product.findByIdAndUpdate(product._id, {
                        productBreakdown : fullBreakdown
                    })
                }

            }


            res.json({
                success : true,
            })

            
        }
        else{
            const newProduct = new Product({
                name,
                description,
                subscription_available,
                background_color,
                productBreakdown : {
                    size,
                    price,
                    category,
                    quantity
                }
            })

            const savedProduct = await newProduct.save()
    
            res.json({
                success : true,
                project : savedProduct
            })
        }
    } catch (error) {
        res.json({
            success : false,
            error : error.toString() 
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