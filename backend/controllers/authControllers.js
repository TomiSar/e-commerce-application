import bcrypt from 'bcrypt';
import Admin from '../models/adminModel.js';
import { responseReturn } from '../utils/response.js';
import { createJwt } from '../utils/createJwt.js';

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const admin = await Admin.findOne({ email }).select('+password');
    if (admin) {
      const match = await bcrypt.compare(password, admin.password);

      if (match) {
        const token = await createJwt({
          id: admin.id,
          role: admin.role,
        });
        res.cookie('accessToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 200, { token, message: 'Login successful' });
      } else {
        responseReturn(res, 404, { error: 'Wrong password' });
      }
    } else {
      responseReturn(res, 404, { error: 'Email not found' });
    }
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

export { adminLogin };
