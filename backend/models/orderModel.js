const mongoose = require('mongoose')


const orderItemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    product: { type: mongoose.Schema.ObjectId, required: true, ref: "Product" },
})

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: Number, required: true },
        phoneNo: { type: Number, required: true }
    },
    orderItems: [orderItemsSchema],
    user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    paymentInfo: {
        transaction_id: { type: String, required: true },
        status: { type: String, required: true },
        paidAt: { type: Date, default: Date.now() }
    },
    orderPrice: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    shippingCost: { type: Number, required: true, default: 0 },
    totalCost: { type: Number, required: true, default: 0 },
    orderStatus: { type: String, required: true, default: "Processing" },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now() }
})
module.exports = mongoose.model("Order", orderSchema)