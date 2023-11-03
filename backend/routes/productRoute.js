//All the request related to products will be listened on the paths provided in here. Those request then will be routed to corresponding request handlers
const express = require('express')
const productRouter = express.Router()
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, addProductReview, getAllReviews, deleteReview, getProductCategories, getTopDeals } = require('../controllers/productController')
const {isUserAuthenticated, authoriseRoles} = require('../middlewares/auth')

//The request along with the corresponding request handler will be given to product controller
productRouter.get('/products', getAllProducts)
productRouter.get('/productCategories', getProductCategories)
productRouter.get('/topDeals', getTopDeals)
productRouter.get('/product/:id', getProductDetails)
productRouter.put('/product/reviews', isUserAuthenticated, addProductReview)
productRouter.get('/product/reviews/:id', isUserAuthenticated, getAllReviews)
productRouter.delete('/product/reviews/delete', isUserAuthenticated, deleteReview)
productRouter.post('/admin/product/new', isUserAuthenticated , authoriseRoles("admin"), createProduct)   //-- admin only
productRouter.put('/admin/product/:id', isUserAuthenticated , authoriseRoles("admin"), updateProduct)    //-- admin only
productRouter.delete('/admin/product/:id', isUserAuthenticated , authoriseRoles("admin"), deleteProduct) //-- admin only

module.exports = productRouter