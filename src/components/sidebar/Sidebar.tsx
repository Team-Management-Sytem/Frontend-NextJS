'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import TeamList from '@/app/components/teamList';

interface Team {
  id: number;
  name: string;
  description: string;
}

interface SidebarProps {
  teams: Team[];
  loadingTeams: boolean;
  userData: { name: string } | null;
  handleSelectTeam: (id: number) => void;
  handleDeleteTeam: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  teams,
  loadingTeams,
  userData,
  handleSelectTeam,
  handleDeleteTeam,
}) => {
  return (
    <aside className='w-1/5 bg-gray-50 p-6 border-r'>
      <div className='flex items-center'>
        <Link href='/' className='flex items-center mb-5 cursor-pointer'>
          <div className='w-11 h-11'>
            <Image
              width={48}
              height={48}
              src='/images/profile.jpg'
              alt='Profile'
              className='w-full h-full object-cover rounded-full'
            />
          </div>
          <span className='ml-4 text-xl font-semibold'>
            {userData ? userData.name : 'Loading...'}
          </span>
        </Link>
      </div>
      {loadingTeams ? (
        <p>Loading teams...</p>
      ) : (
        <TeamList
          teams={teams}
          onDelete={handleDeleteTeam}
          onSelect={handleSelectTeam}
          onCreate={() => (window.location.href = '/addTeam')}
        />
      )}
      <button className='mt-32 text-red-500 flex items-end'>
        <span className='text-md font-bold'>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
