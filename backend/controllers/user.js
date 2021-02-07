import asyncHandler from 'express-async-handler'
import generateAuthToken from '../utils/generateToken.js'
import User from '../models/User.js'

/**
 * @description Authenticate user & get token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide an email and password')
  }

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateAuthToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

/**
 * @description Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
})

/**
 * @description Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create(req.body)

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateAuthToken(user._id),
  })
})

/**
 * @description Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const UpdateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  if (req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save()

  return res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateAuthToken(updatedUser._id),
  })
})

/**
 * @description Get all users
 * @route GET /api/users
 * @access Private(admin only)
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { password: 0 })
  return res.status(200).json(users)
})

/**
 * @description Delete user
 * @route DELETE /api/users/:id
 * @access Private(admin only)
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  await user.remove()
  return res.status(200).json({ message: 'User successfully removed' })
})

/**
 * @description Get user by Id
 * @route GET /api/users/:id
 * @access Private(admin only)
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  return res.status(200).json(user)
})

/**
 * @description Update User
 * @route PUT /api/users/:id
 * @access Private(admin only)
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  user.isAdmin = req.body.isAdmin

  const updatedUser = await user.save()
  updatedUser.password = undefined //remove password

  return res.status(200).json(updatedUser)
})

export {
  authUser,
  registerUser,
  getUserProfile,
  UpdateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
