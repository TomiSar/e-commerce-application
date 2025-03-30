import express from 'express';
import {
  addProfileInfo,
  adminLogin,
  getUser,
  sellerLogin,
  sellerRegister,
  uploadProfileImage,
} from '../controllers/authControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/admin-login').post(adminLogin);
router.route('/get-user').get(authMiddleware, getUser);
router.route('/seller-register').post(sellerRegister);
router.route('/seller-login').post(sellerLogin);
router.route('/profile-image-upload').post(authMiddleware, uploadProfileImage);
router.route('/profile-info-add').post(authMiddleware, addProfileInfo);

export default router;
