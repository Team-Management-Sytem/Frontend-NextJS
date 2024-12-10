'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { deleteTeam, fetchTeam, fetchTeams, updateTeam } from '@/lib/api';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import TeamList from '@/app/components/teamList';

interface Team {
  id: number;
  name: string;
  description: string;
}

export default function HomePage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [putTeam, setUpdateTeam] = useState<Team | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getTeams() {
      try {
        const response = await fetchTeams();
        setTeams(response.data);
      } catch (error) {
        alert('Error fetching data');
      } finally {
        setLoadingTeams(false);
      }
    }
    getTeams();
  }, []);

  const handleDeleteTeam = async (id: number) => {
    try {
      await deleteTeam(id);
      setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
      if (selectedTeam?.id === id) {
        setSelectedTeam(null);
      }
    } catch (error) {
      alert('Error deleting team');
    }
  };

  const handleSelectTeam = async (id: number) => {
    try {
      const response = await fetchTeam(id);
      setSelectedTeam(response.data);
    } catch (error) {
      alert('Error fetching team data');
    }
  };

  const handleUpdateTeam = async () => {
    if (!putTeam) return;
    try {
      await updateTeam(putTeam.id, {
        name: putTeam.name,
        description: putTeam.description,
      });

      const updatedTeam = await fetchTeam(putTeam.id);

      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === putTeam.id ? { ...team, ...updatedTeam.data } : team
        )
      );
      setSelectedTeam(updatedTeam.data);
      setUpdateTeam(null);
    } catch (error) {
      alert('Failed to update team');
    }
  };

  const dummyCards = [
    {
      title: 'Card Title 1',
      description: 'Card Description 1',
      footer: 'Card Footer 1',
    },
    {
      title: 'Card Title 2',
      description: 'Card Description 2',
      footer: 'Card Footer 2',
    },
    {
      title: 'Card Title 3',
      description: 'Card Description 3',
      footer: 'Card Footer 3',
    },
    {
      title: 'Card Title 4',
      description: 'Card Description 4',
      footer: 'Card Footer 4',
    },
  ];

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <aside className='w-1/5 bg-gray-50 p-6 border-r'>
        <div className='flex items-center mb-10'>
          <Link
            href='/profileSettings'
            className='flex items-center mb-10 cursor-pointer'
          >
            <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
            <span className='ml-4 text-xl font-semibold'>Username</span>
          </Link>
        </div>
        {loadingTeams ? (
          <p>Loading teams...</p>
        ) : (
          <TeamList
            teams={teams}
            onDelete={handleDeleteTeam}
            onSelect={handleSelectTeam}
            onCreate={() => router.push('/addTeam')}
          />
        )}
        <button className='mt-6 text-red-500 flex items-center'>
          <span className='text-md font-bold'>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className='flex-1 bg-gray-100 p-6'>
        {selectedTeam ? (
          <div className='bg-white p-6 rounded-lg shadow'>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-semibold'>{selectedTeam.name}</h1>
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.1275 2.85963L10.1837 2.89213C10.6701 3.17289 11.0756 3.407 11.3726 3.63616C11.686 3.87803 11.9347 4.15565 12.0389 4.54451C12.1431 4.93338 12.0665 5.29819 11.916 5.66437C11.8115 5.91854 11.6579 6.20415 11.4729 6.52995L11.0758 6.29394L11.0707 6.29094L6.74235 3.79199L6.33757 3.55342C6.52513 3.23399 6.69412 2.96116 6.86049 2.74556C7.10236 2.43214 7.37998 2.18337 7.76885 2.07917C8.15771 1.97498 8.52252 2.05161 8.8887 2.20211C9.23562 2.34469 9.64115 2.57884 10.1275 2.85963Z'
                  fill='#AFAFAF'
                />
                <path
                  d='M5.86793 4.36484L3.6942 8.12978C3.50808 8.45153 3.36092 8.70594 3.3064 8.99532C3.25188 9.2847 3.29637 9.57522 3.35264 9.94264L3.3678 10.042C3.47166 10.724 3.55728 11.2863 3.6864 11.7126C3.82145 12.1585 4.02904 12.5445 4.43734 12.7802C4.84563 13.0159 5.28367 13.0027 5.73735 12.8967C6.17114 12.7954 6.70085 12.5884 7.3435 12.3373L7.43709 12.3008C7.78342 12.1658 8.05726 12.0591 8.28061 11.8672C8.50396 11.6753 8.6507 11.4206 8.83629 11.0986L11.0049 7.34239L10.5993 7.10135L6.26814 4.60073L5.86793 4.36484Z'
                  fill='#AFAFAF'
                />
              </svg>
            </div>
            <p className='text-gray-600 mt-4'>{selectedTeam.description}</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {dummyCards.map((card, index) => (
              <Card
                key={index}
                className='shadow-lg border border-gray-200 flex flex-col justify-between h-[250px] w-full'
              >
                <CardHeader>
                  <CardTitle className='text-lg font-semibold'>
                    {card.title}
                  </CardTitle>
                  <CardDescription className='text-sm text-gray-500'>
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className='text-gray-600 text-sm'>{card.footer}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {putTeam && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <Card className='w-96 shadow-lg'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  Edit Team
                </CardTitle>
                <CardDescription className='text-sm text-gray-500'>
                  Update the team details below.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Name:
                  </label>
                  <input
                    type='text'
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    value={putTeam.name}
                    onChange={(e) =>
                      setUpdateTeam((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description:
                  </label>
                  <textarea
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    value={putTeam.description}
                    onChange={(e) =>
                      setUpdateTeam((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className='flex justify-end space-x-4'>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                  onClick={() => setUpdateTeam(null)}
                >
                  Cancel
                </button>
                <button
                  className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
                  onClick={handleUpdateTeam}
                >
                  Save
                </button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
