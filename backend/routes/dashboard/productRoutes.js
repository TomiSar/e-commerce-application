import express from 'express';
import { addProduct } from '../../controllers/dashboard/productController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/product-add').post(authMiddleware, addProduct);

export default router;
