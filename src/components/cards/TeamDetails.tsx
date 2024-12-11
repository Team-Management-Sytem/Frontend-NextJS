'use client';

import AddUserModal from '@/components/modals/AddUserModal';
import EditTeamModal from '@/components/modals/EditTeamModal';
import React, { useState } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  telp_number: string;
  role: string;
  image_url: string;
  is_verified: boolean;
}

interface Team {
  id: number;
  name: string;
  description: string;
  users: UserData[];
}

interface TeamDetailsProps {
  team: Team | null;
  handleBack: () => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ team }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  if (!team) return null;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{team.name}</h1>
        <button
          className="text-blue-500 text-sm underline"
          onClick={handleEditClick}
          title="Edit Team"
        >
          Edit Team
        </button>
      </div>

      <p className="text-gray-600 mt-4">{team.description}</p>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddUserClick}
        >
          <i className="fas fa-plus"></i> Add User to Team
        </button>
      </div>

      {isEditModalOpen && (
        <EditTeamModal 
          team={team} 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}

      {isAddUserModalOpen && (
        <AddUserModal 
          teamId={team.id} 
          isOpen={isAddUserModalOpen} 
          onClose={() => setIsAddUserModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default TeamDetails;