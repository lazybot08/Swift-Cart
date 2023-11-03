const cookieParser = require('cookie-parser')
const cors = require('cors')
//create an express app. 
const express = require('express')
const app = express()
const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')
const errorMiddleware = require('./middlewares/error')
const orderRouter = require('./routes/orderRoute')

//Now for allowing cross origin requests we need cors module
app.use(cors({
    origin: "https://e-commerce-frontend-yinf.onrender.com",
    credentials: true
}))
app.use(express.json({limit: '50mb'}))                                //It is an inbuilt middleware to parse the request JSON payloads. It is being used as a global middleware because it will mount on every path
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(cookieParser())


//Routes
// -- Index Route
app.use(express.static('public'))
// -- Product Routes
app.use('/api/v1', productRouter)
//-- User Routes
app.use('/api/v1', userRouter)
//-- Order Routes
app.use('/api/v1', orderRouter)

//Error middleware -- It is also a global middleware. If no routes work then we will always end up on error middleware. Because it will only be called by next() function inside on of the above routes if we encounter any error
app.use(errorMiddleware)

module.exports = app