import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from'express-async-handler'

const router = express.Router()



// @desc fetch all products
// @route GET /api/products
// @access public
router.get('/', asyncHandler(async (req, res) => {
   const products = await Product.find({})
  res.json(products)
}))

// @desc fetch a single products
// @route GET /api/product/:id
// @access public
router.get('/:id',asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
      res.json(product)
  }
  else{
      res.status(404).json({message:'Poduct not found'})
  }
}))



export default router


