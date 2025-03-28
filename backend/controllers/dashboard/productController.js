import { responseReturn } from '../../utils/response.js';
import formidable from 'formidable';
import Product from '../../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';

const addProduct = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, field, files) => {
    // console.log(files.images[0]);
    // console.log(field);
    const { id } = req;
    let {
      name,
      description,
      discount,
      price,
      brand,
      stock,
      category,
      shopName,
    } = field;

    const { images } = files;
    name = name.trim();
    const slug = name.split(' ').join('-');

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
      secure: true,
    });

    try {
      let allImageUrl = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i].filepath, {
          folder: 'products',
        });
        allImageUrl = [...allImageUrl, result.url];
      }

      await Product.create({
        sellerId: id,
        name,
        slug,
        category: category.trim(),
        brand: brand.trim(),
        price: parseInt(price),
        stock: parseInt(stock),
        discount: parseInt(discount),
        description: description.trim(),
        shopName,
        images: allImageUrl,
      });

      responseReturn(res, 201, { message: 'Product Added Successfully' });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  });
};

export { addProduct };
