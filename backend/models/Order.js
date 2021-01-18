import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // Array of subdocuments (products ordered e.g Airpod, Iphone and so on...)
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    // single subdocument
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    // To make it scalabe to add other payment methods aside from PayPal
    paymentMethod: {
      type: String,
      required: true,
    },
    // Comes from paypal
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_adress: String,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: Date,
    isDeliverd: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliverdAt: Date,
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', OrderSchema)

export default Order
