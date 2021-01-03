import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

/***
 * @description Fetch all products
 * @route GET api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  return res.status(200).json(products)
})

/***
 * @description Fetch a product
 * @route GET api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found.')
  }

  return res.status(200).json(product)
})

export { getProducts, getProductById }
