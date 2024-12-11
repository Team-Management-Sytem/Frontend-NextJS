'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import InputField from '@/components/form/InputField';

import { registerUser } from '@/app/services/userService';

const Register = () => {
  const [name, setName] = useState('');
  const [telp_number, settelp_number] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await registerUser(name, telp_number, email, password);
      router.push('/login');
    } catch (err) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='w-full md:w-1/2 flex justify-center items-center bg-white p-6'>
        <div className='max-w-md w-full p-4'>
          <h2 className='text-4xl font-bold text-start mb-6'>Register</h2>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <div className='mb-3'>
            <label className='block text-sm font-medium mb-2 text-gray-700'>
              Name
            </label>
            <InputField
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium mb-2 text-gray-700'>
              Phone Number
            </label>
            <InputField
              type='text'
              placeholder='Phone Number'
              value={telp_number}
              onChange={(e) => settelp_number(e.target.value)}
            />
          </div>
          <div className='mb-3'>
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
          <div className='mb-3'>
            <label className='block text-sm font-medium mb-2 text-gray-700'>
              Password
            </label>
            <InputField
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleRegister}
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
            Register
          </button>
          <div className='mt-4 text-center'>
            <span className='text-sm text-gray-500'>
              Already have an account?{' '}
              <Link href='/login' className='text-blue-500 hover:underline'>
                Login.
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className='hidden md:flex w-1/2 bg-gray-300 justify-center items-center'>
        <Image
          src='/images/managetask.gif'
          alt='Register image'
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Register;
