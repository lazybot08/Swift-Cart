const express = require('express')
const { newOrder, getOrderDetails, getMyOrders, getAllOrders, deleteOrder, updateOrderStatus } = require('../controllers/orderController')
const { isUserAuthenticated, authoriseRoles } = require('../middlewares/auth')
const orderRouter = express.Router()

orderRouter.post('/orders/create', isUserAuthenticated, newOrder)
orderRouter.get('/admin/orders/:id', isUserAuthenticated, getOrderDetails)    
orderRouter.get('/orders/myOrders', isUserAuthenticated, getMyOrders)
orderRouter.get('/admin/orders', isUserAuthenticated, authoriseRoles("admin"), getAllOrders)      //-- ADMIN ONLY
orderRouter.put('/admin/orders/update/:id', isUserAuthenticated, authoriseRoles("admin"), updateOrderStatus)  //-- ADMIN ONLY
orderRouter.delete('/admin/orders/delete/:id', isUserAuthenticated, authoriseRoles("admin"), deleteOrder)   //-- ADMIN ONLY
module.exports=orderRouter