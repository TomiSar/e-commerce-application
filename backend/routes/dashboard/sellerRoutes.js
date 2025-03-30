import express from 'express';
import {
  getSeller,
  getSellerRequest,
  updateSellerStatus,
} from '../../controllers/dashboard/sellerController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.route('/get-seller-request').get(authMiddleware, getSellerRequest);
router.route('/get-seller/:sellerId').get(authMiddleware, getSeller);
router.route('/update-seller-status').post(authMiddleware, updateSellerStatus);

export default router;
