import { responseReturn } from '../../utils/response.js';
import formidable from 'formidable';
import Category from '../../models/categoryModel.js';
import { v2 as cloudinary } from 'cloudinary';

const addCategory = async (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      responseReturn(res, 404, { error: 'something went wrong' });
    } else {
      let { name } = fields;
      let { image } = files;
      name = name.trim();
      const slug = name.split(' ').join('-');

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: 'categories',
        });

        if (result) {
          const category = await Category.create({
            name,
            slug,
            image: result.url,
          });
          responseReturn(res, 201, {
            category,
            message: 'Category Added Successfully',
          });
        } else {
          responseReturn(res, 404, { error: 'Image Upload File Error' });
        }
      } catch (error) {
        responseReturn(res, 500, { error: 'Internal Server Error' });
      }
    }
  });
};

const getCategory = async () => {
  console.log('this is working Get CATEGORY!!');
};

export { addCategory, getCategory };
