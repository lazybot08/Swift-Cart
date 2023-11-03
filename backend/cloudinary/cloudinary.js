const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv'); 
dotenv.config({path:"config/config.env"})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY
})
module.exports = cloudinary