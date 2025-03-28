import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/Reducers/categoryReducer';
import {
  getProduct,
  updateProduct,
  messageClear,
} from '../../store/Reducers/productReducer';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { product, loader, successMessage, errorMessage } = useSelector(
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

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

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
  // const [images, setImages] = useState([]);
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

  const changeImage = (img, files) => {
    if (files.length > 0) {
      console.log(img);
      console.log(files[0]);
    }
  };

  useEffect(() => {
    setState({
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
    });
    setCategory(product.category);
    setImageShow(product.images);
  }, [product]);

  useEffect(() => {
    if (categories.length > 0) {
      setAllCategory(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 2000,
      });
      dispatch(messageClear());
    }

    if (errorMessage) {
      toast.error(errorMessage, { position: 'top-right', autoClose: 2000 });
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const update = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      productId: productId,
    };

    console.log(state);
    dispatch(updateProduct(obj));
  };

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h1 className='text-[#d0d2d6] text-xl font-semibold'>Edit Product</h1>
          <Link
            to='/seller/dashboard/products'
            className='bg-blue-500 w-[150px] hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2'
          >
            All Product
          </Link>
        </div>

        <div>
          <form onSubmit={update}>
            <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name'>Product Name</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  id='name'
                  name='name'
                  type='text'
                  onChange={inputHandle}
                  value={state.name}
                  placeholder='Product Name'
                />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor='brand'>Product Brand</label>
                <input
                  className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                  id='brand'
                  name='brand'
                  type='text'
                  onChange={inputHandle}
                  value={state.brand}
                  placeholder='Product Name'
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
                    {allCategory.length > 0 &&
                      allCategory.map((c, i) => (
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
                          {c.name}
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
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div key={i}>
                    <label htmlFor={i}>
                      <img src={img} alt='' />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type='file'
                      id={i}
                      className='hidden'
                    />
                  </div>
                ))}
            </div>
            <div className='flex'>
              <button
                className='bg-slate-900 w-[180px] hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
                disabled={loader ? true : false}
              >
                {loader ? (
                  <PropagateLoader color='#fff' cssOverride={overrideStyle} />
                ) : (
                  'Update Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
