import { responseReturn } from '../../utils/response.js';
import formidable from 'formidable';

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
    }
  });
};

const getCategory = async () => {
  console.log('this is working Get CATEGORY!!');
};

export { addCategory, getCategory };
