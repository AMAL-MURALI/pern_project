import express from 'express'
import { createAllProducts, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/',getAllProducts)

router.get('/:id',getProduct)

router.post('/',createAllProducts)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)


export default router