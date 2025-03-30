import bcrypt from 'bcrypt';
import Admin from '../models/adminModel.js';
import sellerModel from '../models/sellerModel.js';
import sellerCustomerModel from '../models/chat/sellerCustomerModel.js';
import { responseReturn } from '../utils/response.js';
import { createJwt } from '../utils/createJwt.js';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  try {
    const admin = await Admin.findOne({ email }).select('+password');
    // console.log(admin);
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
    // console.log(error);
    responseReturn(res, 500, { error: error.message });
  }
};

const sellerRegister = async (req, res) => {
  const { email, name, password } = req.body;
  // console.log(req.body);
  try {
    const seller = await sellerModel.findOne({ email });
    // console.log(seller);
    if (seller) {
      responseReturn(res, 404, { error: 'Email Already Exists' });
    } else {
      const seller = await sellerModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        method: 'manually',
        shopInfo: {},
      });
      await sellerCustomerModel.create({ myId: seller.id });
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
    const seller = await sellerModel.findOne({ email }).select('+password');
    // console.log(seller);
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
    // console.log(error);
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
      const seller = await sellerModel.findById(id);
      responseReturn(res, 200, { userInfo: seller });
    }
  } catch (error) {
    // console.log(error.message);
    responseReturn(res, 500, { error: 'Internal Server Error' });
  }
};

const uploadProfileImage = async (req, res) => {
  const { id } = req;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, _, files) => {
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
      secure: true,
    });
    const { image } = files;

    try {
      const result = await cloudinary.uploader.upload(image.filepath, {
        folder: 'profile',
      });
      if (result) {
        await sellerModel.findByIdAndUpdate(id, {
          image: result.url,
        });
        const userInfo = await sellerModel.findById(id);
        responseReturn(res, 201, {
          message: 'Profile Image Upload Successfully',
          userInfo,
        });
      } else {
        responseReturn(res, 404, { error: 'Image Upload Failed' });
      }
    } catch (error) {
      // console.log(error.message);
      responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  });
};

const addProfileInfo = async (req, res) => {
  const { id } = req;
  const { division, district, shopName, subDistrict } = req.body;

  try {
    await sellerModel.findByIdAndUpdate(id, {
      shopInfo: {
        shopName,
        division,
        district,
        subDistrict,
      },
    });
    const userInfo = await sellerModel.findById(id);
    responseReturn(res, 201, {
      message: 'Profile info Added Successfully',
      userInfo,
    });
  } catch (error) {
    // console.log(error.message);
    responseReturn(res, 500, { error: error.message });
  }
};

export {
  adminLogin,
  getUser,
  sellerRegister,
  sellerLogin,
  uploadProfileImage,
  addProfileInfo,
};
