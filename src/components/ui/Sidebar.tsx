'use client';

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
    <aside className="w-1/5 bg-gray-50 p-6 border-r">
      <div className="flex items-center mb-10">
        <Link href="/" className="flex items-center mb-10 cursor-pointer">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <span className="ml-4 text-xl font-semibold">{userData ? userData.name : 'Loading...'}</span>
        </Link>
      </div>
      {loadingTeams ? (
        <p>Loading teams...</p>
      ) : (
        <TeamList
          teams={teams}
          onDelete={handleDeleteTeam}
          onSelect={handleSelectTeam}
          onCreate={() => window.location.href = '/addTeam'}
        />
      )}
      <button className="mt-6 text-red-500 flex items-center">
        <span className="text-md font-bold">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
