import express from 'express'
import dotenv from 'dotenv'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import ProductRouter from './routers/productRouters.js'

dotenv.config()
connectDB()

const app = express() 
app.use('/api/products',ProductRouter)

// Error middlewares
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.json('Api is running....')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
