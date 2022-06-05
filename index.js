// application wide middleware
require('dotenv').config()
require('express-async-errors')

//app setup
const express = require('express')
const app = express()
const connectDb = require('./Db/connect')
const passport = require('passport')
const userRouter =  require('./Users/routes')
const profileRouter = require('./Profile/routes')
const eventRouter = require('./Event/routes')
const restaurantRouter = require('./Restaurant/routes')


//custom-built middleware
const notFound = require('./Middleware/notFound')
const errorHandlerMiddleware = require('./Middleware/errorHandler')
const authMiddleware = require('./Middleware/authentication')

//inbuilt-middleware
app.use(express.json())
app.use(passport.initialize())


// test-route
app.get('/', (req,res)=>{
  res.send('<h4>Hostout application is up and running at </h4><a href="">Documentation</a>')
})

//routes
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/event', eventRouter)
app.use('/api/v1/restaurant', restaurantRouter)


app.use(errorHandlerMiddleware)
app.use(notFound)

//port
const port = process.env.PORT || 3000

//server
const start = async()=>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, ()=>console.log(`server is running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()