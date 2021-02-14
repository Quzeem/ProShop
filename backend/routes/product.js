import express from 'express'
import upload from '../config/multer.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  uploadProductImage,
} from '../controllers/product.js'
import { protect, admin } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
router.post('/image/upload', upload.single('image'), uploadProductImage)

export default router
