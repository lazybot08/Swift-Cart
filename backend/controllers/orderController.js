const Order = require('../models/orderModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const Product = require('../models/productModel')
//Create a new order -- ADMIN ONLY
exports.newOrder = catchAsyncError(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        orderPrice,
        tax,
        shippingCost,
        totalCost,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        user: req.user._id,
        paymentInfo,
        orderPrice,
        tax,
        shippingCost,
        totalCost,
        orderStatus: "succeeded",
    })
    res.status(201).json({
        success: true,
        order
    })
})

//to get a order details  -- ADMIN ONLY
exports.getOrderDetails = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (!order) {
        return next(new ErrorHandler(404, "Order with this id does not exist"))
    }
    res.status(200).json({
        success: true,
        order
    })
})

//method to get the order details by id
exports.getMyOrders = catchAsyncError(async (req, res, next) => {
    const myOrders = await Order.find({ user: req.user._id })
    res.status(200).json({
        success: true,
        myOrders
    })
})

//get all order details
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const Orders = await Order.find()

    //calculate the total amount of money owner is going to make from all orders
    let totalEarnings = 0
    Orders.forEach(order => {
        totalEarnings += order.totalCost
    })
    res.status(200).json({
        success: true,
        Orders,
        totalEarnings
    })
})

//method to update orderStatus
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(404, "Order with this id does not exist"))
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler(400, "You have already delivered this order"))
    }
    order.orderItems.forEach(async (itemDetails)=>{
        await updateStock(itemDetails.product, itemDetails.qty)
    })
    order.orderStatus = req.body.orderStatus
    if(req.body.orderStatus === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})
    res.status(200).json({
        success: true,

    })
})
async function updateStock(id, quantity){
    const product = await Product.findById(id)
    product.stock -= quantity
    await product.save({validateBeforeSave: false})

}

//method to delete an order
exports.deleteOrder = catchAsyncError(async (req, res, next)=> {
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(404, "Order with this id does not exist"))
    }
    await order.remove()
    res.status(200).json({
        success: true,
        message: "Order removed successfully"
    })
})