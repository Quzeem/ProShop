import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const payload = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(payload.id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  res.status(401)
  throw new Error('Not authorized as an admin')
}

export { protect, admin }
