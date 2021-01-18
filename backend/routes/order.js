import express from 'express'
import { addOrderItems } from '../controllers/order.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)

export default router
