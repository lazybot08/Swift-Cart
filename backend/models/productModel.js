//The product model will contain the schema of product data. 
const mongoose = require('mongoose')
//Create the schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"]     //It says required is true but if name not entered by the user then give following error "Please enter product name"
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    originalPrice: {
        type: Number,
        required: [true, "Please Enter the Actual Product Price"],
        maxLength: [8, "Price can not exceed 8 characters"]
    },
    discount: {
        type: Number,
        required: [true, "Please enter the discount on the product"],
        min: [0, "Can not enter discount less than 0%"],
        max: [100, "Can not enter discount more than 100%"]
    },
    price: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter Product Category"]
    },
    stock: {
        type: Number, 
        required: [true, "Please enter the product stock"],
        maxLength: [4, "Stock can not exceed 4 digit character"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: "User"
            },
            name:{
                type:String,
                required: true
            },
            avtar:{
                public_id: {
                    type: String,
                    default: ""
                },
                url: {
                    type: String,
                    default: ""
                }
            },
            rating: {
                type: Number,
                set: function(rating){return Math.round(rating)},
                required: true,
                max:5
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",                      //now we have to take the user_id from "User" model so ref parameter refers to it
      
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

//create the product model using above schema and export it to productController
//Model name in mongoose will be used as collection name in mongoDB but with lowercase plural form
//Like in this case "Product" is the model name so collection name in mongoDB would be "products"
module.exports= mongoose.model("Product", productSchema) 