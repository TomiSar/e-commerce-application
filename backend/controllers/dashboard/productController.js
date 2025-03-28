import { responseReturn } from '../../utils/response.js';
import formidable from 'formidable';
import productModel from '../../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';

const addProduct = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, field, files) => {
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
      const images = Array.isArray(files.images)
        ? files.images
        : [files.images];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i].filepath, {
          folder: 'products',
        });
        allImageUrl.push(result.url);
      }

      await productModel.create({
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

const getProducts = async (req, res) => {
  try {
    let { itemsPerPage, currentPage, searchValue } = req.query;
    const { id: sellerId } = req;
    itemsPerPage = parseInt(itemsPerPage) || 10;
    currentPage = parseInt(currentPage) || 1;
    const skipPage = itemsPerPage * (currentPage - 1);

    let query = { sellerId };
    if (searchValue) {
      query.$or = [
        { name: { $regex: searchValue, $options: 'i' } },
        { description: { $regex: searchValue, $options: 'i' } },
      ];
    }

    // Two queries in parallel
    const [products, totalProduct] = await Promise.all([
      productModel
        .find(query)
        .skip(skipPage)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 }),
      productModel.countDocuments(query),
    ]);

    responseReturn(res, 200, { products, totalProduct });
  } catch (error) {
    console.error(error.message);
    responseReturn(res, 500, { error: 'Server error' });
  }
};

export { addProduct, getProducts };
