/* eslint-disable jsx-a11y/scope */
import React, { useState } from 'react';
import Search from '../components/Search';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000000] font-semibold text-lg mb-3'>Orders</h1>

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
                  Order Id
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Order Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    #1234
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    $455
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    pending
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    pending
                  </td>
                  <td
                    className='py-1 px-4 font-medium whitespace-nowrap'
                    scope='row'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            itemsPerPage={itemsPerPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
