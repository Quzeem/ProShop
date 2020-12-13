import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import connectDB from './config/db.js'

// Load env variables into process.env
dotenv.config()

// Implementing __dirname in ES6 modules
// const __dirname = path.dirname(new URL(import.meta.url).pathname)

// Connect to Database
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Create users - create() is used here to trigger save() hook
    const createdUsers = await User.create(users)

    // Get admin ID
    const adminUser = createdUsers[0]._id

    // Set the admin as the user(a required field) to each product object(document)
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }))
    // create products
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Deleted!')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// Run specific command
if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
