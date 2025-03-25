import bcrypt from 'bcrypt';
import Admin from '../models/adminModel.js';
import Seller from '../models/sellerModel.js';
import SellerCustomer from '../models/chat/sellerCustomerModel.js';
import { responseReturn } from '../utils/response.js';
import { createJwt } from '../utils/createJwt.js';

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

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

const sellerRegister = async (req, res) => {
  const { email, name, password } = req.body;
  // console.log(req.body);
  try {
    const user = await Seller.findOne({ email });
    if (user) {
      responseReturn(res, 404, { error: 'Email Already Exists' });
    } else {
      const seller = await Seller.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        method: 'manually',
        shopInfo: {},
      });
      console.log(seller);
      await SellerCustomer.create({ myId: seller.id });
      const token = await createJwt({ id: seller.id, role: seller.role });
      res.cookie('accessToken', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      responseReturn(res, 201, {
        token,
        message: 'Seller registration successful',
      });
    }
  } catch (error) {
    // console.log(error);
    responseReturn(res, 500, { error: 'Internal Server Error' });
  }
};

const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const seller = await Seller.findOne({ email }).select('+password');
    console.log(seller);
    if (seller) {
      const match = await bcrypt.compare(password, seller.password);

      if (match) {
        const token = await createJwt({
          id: seller.id,
          role: seller.role,
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

const getUser = async (req, res) => {
  const { id, role } = req;

  try {
    if (role === 'admin') {
      const user = await Admin.findById(id);
      responseReturn(res, 200, { userInfo: user });
    } else {
      console.log('Seller Info');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { adminLogin, getUser, sellerRegister, sellerLogin };
