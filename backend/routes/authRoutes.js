import express from 'express';
import { adminLogin, getUser } from '../controllers/authControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/admin-login').post(adminLogin);

router.route('/get-user').get(authMiddleware, getUser);

export default router;
