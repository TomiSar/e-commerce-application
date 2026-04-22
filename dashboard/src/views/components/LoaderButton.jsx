import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';

const LoaderButton = ({ loader, buttonText }) => {
  return (
    <div>
      <button
        className='bg-slate-900 w-[180px] hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
        disabled={loader ? true : false}
      >
        {loader ? (
          <PropagateLoader color='#fff' cssOverride={overrideStyle} />
        ) : (
          { buttonText }
        )}
      </button>
    </div>
  );
};

export default LoaderButton;
