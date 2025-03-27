import { responseReturn } from '../../utils/response.js';
import formidable from 'formidable';
import Product from '../../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';

const addProduct = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, field, files) => {
    console.log(files.images[0]);
    console.log(field);
  });
};

export { addProduct };
