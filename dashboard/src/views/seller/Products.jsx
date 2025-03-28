/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/Reducers/productReducer';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);

  useEffect(() => {
    const obj = {
      itemsPerPage: parseInt(itemsPerPage),
      currentPage: parseInt(currentPage),
      searchValue,
    };
    dispatch(getProducts(obj));
  }, [itemsPerPage, currentPage, searchValue, dispatch]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000000] font-semibold text-lg mb-3'>
        All Products
      </h1>

      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search
          setItemsPerPage={setItemsPerPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className='relative overflow-x-auto mt-5'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  No
                </th>
                <th scope='col' className='py-3 px-4'>
                  Image
                </th>
                <th scope='col' className='py-3 px-4'>
                  Name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Description
                </th>
                <th scope='col' className='py-3 px-4'>
                  Category
                </th>
                <th scope='col' className='py-3 px-4'>
                  Brand
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Discount
                </th>
                <th scope='col' className='py-3 px-4'>
                  Stock
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, i) => (
                <tr key={i}>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    {i + 1}
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    <img
                      className='w-[45px] h-[45px]'
                      src={product.images[0]}
                      alt=''
                    />
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    {product.name}
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    {product?.description?.slice(0, 20)}...
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    {product.category}
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    {product.brand}
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    {product.price}€
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {product.discount === 0 ? (
                      <span>No Discount</span>
                    ) : (
                      <span>{product.discount}%</span>
                    )}
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    {product.stock}
                  </td>

                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'
                        to={`/seller/dashboard/edit-product/32`}
                      >
                        <FaEdit />
                      </Link>
                      <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
                        <FaEye />
                      </Link>
                      <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'>
                        <FaTrash />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalProduct <= itemsPerPage ? (
          ''
        ) : (
          <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              itemsPerPage={itemsPerPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
