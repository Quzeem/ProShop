import express from 'express'
import { protect } from '../middleware/auth.js'
import { authUser, registerUser, getUserProfile } from '../controllers/user.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
