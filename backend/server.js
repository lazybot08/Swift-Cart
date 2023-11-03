const app = require('./app')
const dotenv = require('dotenv');
//config
//load environment variable from .env file using dotenv 
dotenv.config({path:"config/config.env"})
//database connection 
const {connectToDatabase} = require('./config/database')
connectToDatabase()
//server connection 
app.listen(process.env.SERVER_PORT, (req, res)=>{
    console.log(`Server is listening to http://localhost:${process.env.SERVER_PORT || 4000}`)
})