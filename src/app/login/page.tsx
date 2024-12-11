'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import InputField from '@/components/ui/InputField';

import { loginUser } from '@/app/services/userService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className='flex h-screen'>
      <div className='w-full md:w-1/2 flex justify-center items-center bg-white p-6'>
        <div className='max-w-md w-full p-4'>
          <h2 className='text-4xl font-bold text-start mb-6'>Sign in</h2>
          {error && <div className='text-red-500 mb-4'>{error}</div>}

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2 text-gray-700'>
              Email
            </label>
            <InputField
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2 text-gray-700'>
              Password
            </label>
            <div className='flex items-center border border-white'>
              <InputField
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex justify-between items-center mb-14'>
            <div>
              <input type='checkbox' id='remember-me' className='mr-2' />
              <label htmlFor='remember-me' className='text-sm text-gray-500'>
                Remember me
              </label>
            </div>
            <a href='#' className='text-sm text-blue-500 hover:underline'>
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center'
          >
            {isLoading ? (
              <svg
                className='animate-spin h-5 w-5 text-white mr-2'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0a12 12 0 00-12 12h4z'
                ></path>
              </svg>
            ) : null}
            Sign in
          </button>
          <div className='mt-4 text-center'>
            <span className='text-sm text-gray-500'>
              Dont have an account?{' '}
              <Link href='/register' className='text-blue-500 hover:underline'>
                Register.
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className='hidden md:flex w-1/2 bg-gray-300 justify-center items-center'>
        <Image
          src='/images/managetask.gif'
          alt='Login image'
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Login;
