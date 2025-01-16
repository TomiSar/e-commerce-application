import React from 'react';

const Search = ({ setItemsPerPage, setSearchValue, searchValue }) => {
  return (
    <div className='flex justify-between items-center'>
      <select
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
        onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
      </select>
      <input
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
        type='text'
        placeholder='search'
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
