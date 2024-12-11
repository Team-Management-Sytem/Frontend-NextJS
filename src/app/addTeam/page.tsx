'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { postTeam } from '@/lib/api';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export default function AddTeamPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await postTeam({ name, description });
      alert('Team created successfully!');
      router.push('/');
    } catch {
      alert('Failed to create team');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card className='w-96 shadow-lg'>
        <CardHeader className='flex justify-between'>
          <div>
            <CardTitle className='text-lg font-semibold'>
              Create New Team
            </CardTitle>
            <CardDescription className='text-sm text-gray-500'>
              Fill the form below to create a new team.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name:
            </label>
            <input
              type='text'
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description:
            </label>
            <textarea
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className='flex justify-end space-x-4'>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
            onClick={() => router.push('/')}
          >
            Cancel
          </button>
          <button
            className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
            onClick={handleSubmit}
          >
            Create
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
