import React from 'react';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  itemsPerPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / itemsPerPage);
  let startPage = pageNumber;

  if (totalPage - pageNumber <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createButton = () => {
    const buttons = [];

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <li
          key={i}
          className={` ${
            pageNumber === i
              ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white'
              : 'bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}
          onClick={() => setPageNumber(i)}
        >
          {i}
        </li>
      );
    }
    return buttons;
  };

  return (
    <ul className='flex gap-3'>
      {pageNumber > 1 && (
        <li
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createButton()}
      {pageNumber < totalPage && (
        <li
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
