import React, { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submit with Data: ', user);
  };

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#ffffff] p-2'>
        <div className='bg-[#6f68d1] rounded-md p-2'>
          <h2 className='text-xl mb-3 font-bold'>Welcome to E-Commerce</h2>
          <p className='text-sm mb-3 font-medium'>
            Please sign in to your account
          </p>
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
              Sign In
            </button>
            <div className='flex items-center mb-3 gap-3 justify-center'>
              <p>
                Don't have an account?{'  '}
                <Link className='font-bold' to='/register'>
                  Sign Up
                </Link>
              </p>
            </div>
            <div className='w-full flex justify-center items-center mb-3'>
              <div className='w-[45%] bg-slate-900 h-[1px]'></div>
              <div className='w-[10%] flex justify-center items-center'>
                <span className='pb-1'>Or</span>
              </div>
              <div className='w-[45%] bg-slate-900 h-[1px]'></div>
            </div>
            <div className='flex justify-center items-center gap-3'>
              <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span>
                  <FaGoogle />
                </span>
              </div>

              <div className='w-[135px] h-[35px] flex rounded-md bg-slate-900 shadow-lg hover:shadow-slate-900/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span>
                  <FaGithub />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
