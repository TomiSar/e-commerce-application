import express from 'express';
import { addCategory } from '../../controllers/dashboard/categoryController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/category-add').post(authMiddleware, addCategory);

export default router;
