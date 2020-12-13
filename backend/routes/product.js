import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

const router = express.Router()

/***
 * @description Fetch all products
 * @route GET api/products
 * @access Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    return res.status(200).json(products)
  })
)

/***
 * @description Fetch a product
 * @route GET api/products/:id
 * @access Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error('Product not found.')
    }

    return res.status(200).json(product)
  })
)

export default router
