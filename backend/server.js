import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routers/productRoutes.js'
import userRoutes from './routers/userRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// Error middlewares
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
