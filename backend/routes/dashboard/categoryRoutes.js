import express from 'express';
import {
  addCategory,
  getCategory,
} from '../../controllers/dashboard/categoryController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/category-add').post(authMiddleware, addCategory);
router.route('/category-get').get(authMiddleware, getCategory);

export default router;
