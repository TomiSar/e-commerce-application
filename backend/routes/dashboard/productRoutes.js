import express from 'express';
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  updateProductImage,
} from '../../controllers/dashboard/productController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/add-product').post(authMiddleware, addProduct);
router.route('/get-products').get(authMiddleware, getProducts);
router.route('/get-product/:productId').get(authMiddleware, getProduct);
router.route('/update-product').post(authMiddleware, updateProduct);
router.route('/update-product-image').post(authMiddleware, updateProductImage);

export default router;
