import express from 'express'
import dotenv from 'dotenv'
import { unhandledRoutes, errorHandler } from './middleware/error.js'
import productRoutes from './routes/product.js'
import connectDB from './config/db.js'

// Load env variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Mount Routers
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

// Global error handler
app.use(unhandledRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
