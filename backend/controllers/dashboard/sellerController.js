import { responseReturn } from '../../utils/response.js';
import formidable from 'formidable';
import sellerModel from '../../models/sellerModel.js';
import { v2 as cloudinary } from 'cloudinary';

const getSellerRequest = async (req, res) => {
  //   console.log(req.query);
  const { itemsPerPage, currentPage, searchValue } = req.query;
  const skipPage = itemsPerPage * (currentPage - 1);
  try {
    if (searchValue) {
    } else {
      const sellers = await sellerModel
        .find({ status: 'pending' })
        .skip(skipPage)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 });
      const totalSeller = await sellerModel
        .find({ status: 'pending' })
        .countDocuments();
      responseReturn(res, 200, { sellers, totalSeller });
    }
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { error: 'Server error' });
  }
};

export { getSellerRequest };
