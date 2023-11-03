// Manage the flow of a request related to products. As it is ontroller it is not going to directly interact with the database 
//for which we have Model and for the representation of data logics will be inside View (for which we will be using a view engine)
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError')
const ApiFeatures = require('../utils/apiFeatures')

//Create a new Product -- Admin Only Route
exports.createProduct = catchAsyncError(async (req, res) => {
    const {originalPrice, discount} = req.body
    req.body.price = Math.ceil(originalPrice - (originalPrice * discount)/100)
    req.body.createdBy = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product             //can also write it as "product: product" or simply as "product"
    })
})

//Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    let resultsPerPage = 6
    const totalProducts = await Product.countDocuments()
    const filteredProducts = new ApiFeatures(Product.find(), req.query).search().filter()
    const fetchFilteredProducts = await filteredProducts.query    
    const productsPerPage = filteredProducts.pagination(resultsPerPage) 
    const products = await productsPerPage.query.clone()              //clone() method allows mongoose to execute the query multiple times if it was already executed then use clone() at the end of query method to execute it again otherwise executing the same query again will throw an error "Query was already executed")
    res.status(200).json({
        success: true,
        products,
        totalProducts,
        resultsPerPage,
        filteredLength: fetchFilteredProducts.length
    })
})

//get all types of product categories 
exports.getProductCategories = catchAsyncError(async (req, res)=>{
    const products = await Product.find()
    let categories = []
    products.forEach((product)=>{
        categories.push(product.category)
    })
    let categoryUniqueTypes = [...new Set(categories)]
    let categoryImages = []
    categoryUniqueTypes.forEach((category)=>{
        const category_product = (products.find((product)=>{
            return product.category === category
        }))
        categoryImages.push(category_product.images[0].public_id)
    })
    let category = categoryUniqueTypes.map((category, index)=>{
        return {
            category_name: category,
            public_id: categoryImages[index]
        }
    })
    res.status(200).json({
        success: true,
        category
    })
})

//get the top deals 
exports.getTopDeals = catchAsyncError(async (req, res)=>{
    const products = await Product.find()
    const topDeals = products.filter((product)=>{
        return product.discount > 15
    })
    res.status(200).json({
        status: true, 
        topDeals
    })
})

///get a product details (fetching a single product)
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler(500, "Product not Found"))
    }
    res.status(200).json({
        success: true,
        product
    })
})

//Update a product by id -- Admin Route only
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    // Product.updateOne({_id: ObjectID(req.params.id)}, req.body) is going to update the document but in return it gives the count of updates instead of document hence we use findByIdAndUpdate() method
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler(500, "Product not Found"))
    }
    //if product is found update it. Mention the {new: true} to get the new updated document as a return value from findByIdAndUpdate()
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({
        success: true,
        product
    })
})

//delete product -- Admin Only
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler(500, "Product not Found"))
    }
    await product.remove()
    res.status(200).json({
        success: true,
        message: "Product deleted Successfully"
    })
})

//-- Add a review or edit your review
exports.addProductReview = catchAsyncError(async (req, res) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        avtar: {
            public_id: req.user.avtar.public_id,
            url: req.user.avtar.url
        },
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    let isReviewed = false
    //check if already reviewed the product 
    product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
            isReviewed = true
        }
    })
    //if yes, then to update the review
    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating
                review.comment = comment
            }
        })
    }
    //if no, then to create a review
    else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    //now calculate the average of all user ratings for overall rating of the product
    let sum = 0
    product.reviews.forEach((review) => {
        sum += review.rating
    })
    product.rating = (sum / product.reviews.length).toFixed(1)
    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: "review added successfully",
    })
})


//-- get all reviews of a product
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler(404, "Product not Found"))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//delete a review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler(404, "Product not Found"))
    }
    let reviewIndex
    product.reviews.forEach((review) => {
        if (review._id.toString() === req.query.reviewId.toString()) {
            reviewIndex = product.reviews.indexOf(review)
        }
    })
    //delete review using splice method: array.splice(index, howManyToRemove, itemsToBeAdded...)
    product.reviews.splice(reviewIndex, 1)
    //now re-calculate the rating
    let sum = 0
    product.reviews.forEach(review => {
        sum += review.rating
    })
    product.rating = (sum / product.reviews.length).toFixed(1)
    product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: "Review deleted Successfully"
    })
})
