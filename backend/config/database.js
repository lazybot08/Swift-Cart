const mongoose = require('mongoose')
mongoose.set({ strictQuery: true }) //to avoid deprecation warning

//connect to database
const connectToDatabase = () => {
    mongoose.connect(process.env.DB_URI)
        .then(data => {
            console.log(`MongoDB is connected with ${data.connection.host}`)
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports= {connectToDatabase}