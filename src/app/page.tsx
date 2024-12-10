'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { deleteTeam, fetchTeams } from '@/lib/api';

import {
  Card,
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
    } catch (error) {
      alert('Error fetching data');
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
          <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
          <span className='ml-4 text-xl font-semibold'>Username</span>
        </div>
        {loadingTeams ? (
          <p>Loading teams...</p>
        ) : (
          <TeamList
            teams={teams}
            onDelete={handleDeleteTeam}
            onCreate={() => router.push('/addTeam')}
          />
        )}
        <button className='mt-6 text-red-500 flex items-center'>
          <span className='text-md font-bold'>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className='flex-1 bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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
      </main>
    </div>
  );
}
