import React, { useState, useEffect } from 'react';
import { IoMdImages } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import { overrideStyle } from '../../utils/utils';
import { PropagateLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/Reducers/categoryReducer';
import { addProduct, messageClear } from '../../store/Reducers/productReducer';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(
      getCategory({
        itemsPerPage: '',
        currentPage: '',
        searchValue: '',
      })
    );
  }, [dispatch]);

  const [state, setState] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    brand: '',
    stock: '',
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [categoryShow, setCategoryShow] = useState(false);
  const [category, setCategory] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let searchResult = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(searchResult);
    } else {
      setAllCategory(categories);
    }
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 2000,
      });
      dispatch(messageClear());
      setState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: '',
      });
      setImageShow([]);
      setImages([]);
      setCategory('');
    }

    if (errorMessage) {
      toast.error(errorMessage, { position: 'top-right', autoClose: 2000 });
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('description', state.description);
    formData.append('discount', state.discount);
    formData.append('price', state.price);
    formData.append('brand', state.brand);
    formData.append('stock', state.stock);
    formData.append('category', category);
    formData.append('shopName', 'EasyShop');

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    // console.log(state);
    dispatch(addProduct(formData));
  };

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add Product</h1>
          <Link
            className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2 '
            to='/seller/dashboard/products'
          >
            All Product
          </Link>
        </div>
        <div>
          <form onSubmit={add}>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name'>Product Name</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  name='name'
                  type='text'
                  id='name'
                  placeholder='Product Name'
                  value={state.name}
                  onChange={inputHandle}
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='brand'>Product Brand</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  id='brand'
                  type='text'
                  name='brand'
                  placeholder='Brand Name'
                  value={state.brand}
                  onChange={inputHandle}
                />
              </div>
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1 relative'>
                <label htmlFor='category'>Category</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  id='category'
                  type='text'
                  placeholder='--select category--'
                  readOnly
                  value={category}
                  onClick={() => setCategoryShow(!categoryShow)}
                  onChange={inputHandle}
                />

                <div
                  className={`absolute top-[101%] bg-[#475569] w-full transition-all ${
                    categoryShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className='w-full px-4 py-2 fixed'>
                    <input
                      className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden'
                      type='text'
                      placeholder='search'
                      value={searchValue}
                      onChange={categorySearch}
                    />
                  </div>
                  <div className='pt-14'></div>
                  <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scroll'>
                    {allCategory.map((c, i) => (
                      <span
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && 'bg-indigo-500'
                        }`}
                        key={c.id}
                        onClick={() => {
                          setCategoryShow(false);
                          setCategory(c.name);
                          setSearchValue('');
                          setAllCategory(categories);
                        }}
                      >
                        {c.name}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='stock'>Product Stock</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  id='stock'
                  type='text'
                  name='stock'
                  placeholder='Stock'
                  value={state.stock}
                  onChange={inputHandle}
                />
              </div>
            </div>

            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='price'>Price</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  id='price'
                  type='number'
                  name='price'
                  placeholder='price'
                  value={state.price}
                  onChange={inputHandle}
                />
              </div>

              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='discount'>Discount</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  id='discount'
                  type='number'
                  name='discount'
                  placeholder='discount by %'
                  onChange={inputHandle}
                  value={state.discount}
                />
              </div>
            </div>

            <div className='flex flex-col w-full gap-1 mb-5'>
              <label htmlFor='description' className='text-[#d0d2d6]'>
                Description
              </label>
              <textarea
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                id='description'
                name='description'
                placeholder='Description'
                rows='4'
                cols='10'
                value={state.description}
                onChange={inputHandle}
              ></textarea>
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
              {imageShow.map((img, i) => (
                <div className='h-[180px] relative' key={i}>
                  <label htmlFor={i}>
                    <img
                      className='w-full h-full rounded-sm'
                      src={img.url}
                      alt=''
                    />
                  </label>
                  <input
                    className='hidden'
                    id={i}
                    type='file'
                    onChange={(e) => changeImage(e.target.files[0], i)}
                  />
                  <span
                    className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'
                    onClick={() => removeImage(i)}
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              ))}

              <label
                className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-slate-950 w-full text-[#d0d2d6]'
                htmlFor='image'
              >
                <span>
                  <IoMdImages />
                </span>
                <span>Select Image </span>
              </label>
              <input
                className='hidden'
                onChange={imageHandle}
                multiple
                type='file'
                id='image'
              />
            </div>
            <div className='flex'>
              <button
                disabled={loader ? true : false}
                className='bg-slate-900 w-[180px] hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
              >
                {loader ? (
                  <PropagateLoader color='#fff' cssOverride={overrideStyle} />
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
