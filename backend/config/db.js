import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log(`MongoDB connected: ${db.connection.host}`)
  } catch (err) {
    console.error(`Unable to connect to MongoDB: ${err.message}`)
    process.exit(1)
  }
}

export default connectDB
