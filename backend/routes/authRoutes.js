import express from 'express';
import {
  adminLogin,
  getUser,
  sellerLogin,
  sellerRegister,
} from '../controllers/authControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/admin-login').post(adminLogin);
router.route('/get-user').get(authMiddleware, getUser);
router.route('/seller-register').post(sellerRegister);
router.route('/seller-login').post(sellerLogin);

export default router;
