import express from 'express';
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
} from '../../controllers/dashboard/productController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/product-add').post(authMiddleware, addProduct);
router.route('/products-get').get(authMiddleware, getProducts);
router.route('/product-get/:productId').get(authMiddleware, getProduct);
router.route('/product-update').post(authMiddleware, updateProduct);

export default router;
