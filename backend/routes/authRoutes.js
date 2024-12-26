import express from 'express';
import { adminLogin } from '../controllers/authControllers.js';

const router = express.Router();
router.route('/admin-login').post(adminLogin);

export default router;
