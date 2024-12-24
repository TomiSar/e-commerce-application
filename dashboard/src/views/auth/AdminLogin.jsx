import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../store/Reducers/authReducer';

const AdminLogin = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(user));
    // console.log('Submit with Data: ', user);
  };

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#ffffff] p-2'>
        <div className='bg-[#6f68d1] rounded-md p-2'>
          <div className='h-[70px] flex justify-center items-center'>
            <div className='w-[180px] h-[50px]'>
              <img
                className='w-full h-full'
                src='http://localhost:3000/images/logo.png'
                alt='logo'
              />
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='email'>Email</label>
              <input
                className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md'
                type='email'
                name='email'
                placeholder='Email'
                id='email'
                required
                onChange={handleChange}
                value={user.email}
              />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='password'>Password</label>
              <input
                className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md'
                type='password'
                name='password'
                placeholder='Password'
                id='password'
                required
                onChange={handleChange}
                value={user.password}
              />
            </div>
            <button className='bg-slate-900 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
