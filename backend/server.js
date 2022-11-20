const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleWare/errorMiddleware')
const cookieParser = require('cookie-parser')
const app = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//Routes Middleware
app.use('/api/users', userRoute)

//Routes
app.get('/', (req, res) => {
  res.send('Home Page')
})

//Error Middleware 
app.use(errorHandler)
const PORT = process.env.PORT || 5000
//connect to mongodb and start server
mongoose
  // @ts-ignore
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(err))
