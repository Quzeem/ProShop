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

// Mount Routers
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Loading index.html from react static asset built
if (process.env.NODE_ENV === 'production') {
  // set frontend build folder as a static folder
  app.use(express.static(path.join(__dirname, 'frontend', 'build')))

  // send index.html as a response for any route that's not in our API
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

// Global error handler
app.use(unhandledRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
