import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

/***
 * @description Fetch all products
 * @route GET api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const filter = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const pageProductsLimit = 10
  const page = req.query.pageNumber * 1 || 1
  const totalDocuments = await Product.countDocuments(filter)

  const products = await Product.find(filter)
    .limit(pageProductsLimit)
    .skip((page - 1) * pageProductsLimit)

  return res.status(200).json({
    products,
    page,
    pages: Math.ceil(totalDocuments / pageProductsLimit),
  })
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

/**
 * @description Delete a product
 * @route DELETE /api/products/:id
 * @access Private(admin only)
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  await product.remove()
  return res.status(200).json({ message: 'Product successfully removed' })
})

/**
 * @description Create a product
 * @route POST /api/products/
 * @access Private(admin only)
 */
const createProduct = asyncHandler(async (req, res) => {
  const sampleProduct = new Product({
    name: 'Sample name',
    price: 0,
    description: 'Sample description',
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    user: req.user._id,
  })

  const createdProduct = await sampleProduct.save()
  return res.status(201).json(createdProduct)
})

/**
 * @description Update a product
 * @route PUT /api/products/:id
 * @access Private(admin only)
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  // Destructure allowed updates
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  product.name = name
  product.price = price
  product.description = description
  product.image = image
  product.brand = brand
  product.category = category
  product.countInStock = countInStock

  const updatedProduct = await product.save()
  return res.status(200).json(updatedProduct)
})

/***
 * @description Upload product image
 * @route POST api/products/image/upload
 * @access Private(admin only)
 */
const uploadProductImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('Please upload a file')
  }
  return res.status(200).send(`/uploads/${req.file.filename}`)
})

/**
 * @description Create a review
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  // Destructure allowed updates
  const { rating, comment } = req.body

  // Check if user has already submitted a review
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  )
  if (alreadyReviewed) {
    res.status(400)
    throw new Error('Product already reviewed')
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  }

  product.reviews.push(review)
  product.numReviews = product.reviews.length
  product.avgRating =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    product.reviews.length
  await product.save()

  return res.status(201).json({ message: 'Review added' })
})

/***
 * @description Get top products
 * @route GET api/products/top
 * @access Public
 */
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ avgRating: -1 }).limit(3)
  return res.status(200).json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  uploadProductImage,
  createProductReview,
  getTopProducts,
}
