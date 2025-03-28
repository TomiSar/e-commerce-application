import express from 'express';
import {
  addProduct,
  getProducts,
} from '../../controllers/dashboard/productController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/product-add').post(authMiddleware, addProduct);
router.route('/products-get').get(authMiddleware, getProducts);

export default router;
