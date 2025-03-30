import express from 'express';
import {
  addCategory,
  getCategory,
} from '../../controllers/dashboard/categoryController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/add-category').post(authMiddleware, addCategory);
router.route('/get-category').get(authMiddleware, getCategory);

export default router;
