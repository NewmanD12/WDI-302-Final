const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')

router.post('/create-product', productController.createProduct)
router.get('/all-products', productController.allProducts)
module.exports = router