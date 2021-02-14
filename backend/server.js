import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { unhandledRoutes, errorHandler } from './middleware/error.js'
import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'
import orderRoutes from './routes/order.js'
import connectDB from './config/db.js'

// Load env variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

app.use(express.json())

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Mount Routers
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Global error handler
app.use(unhandledRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
