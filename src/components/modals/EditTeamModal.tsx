'use client';

import React, { useState } from 'react';
import { updateTeam } from '@/app/services/teamService';
import { Team } from '@/types';

interface EditTeamModalProps {
  team: Team;
  isOpen: boolean;
  onClose: () => void;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({ team, isOpen, onClose }) => {
  const [updatedTeamData, setUpdatedTeamData] = useState({
    id: team.id,
    name: team.name,
    description: team.description,
    users: team.users,
  });

  const handleUpdateTeam = async () => {
    try {
      await updateTeam(team.id, updatedTeamData);
      onClose();
      window.location.reload(); 
    } catch (error) {
      if (error instanceof Error) {
        alert('Error updating team: ' + error.message);
      } else {
        alert('Error updating team');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Edit Team</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={updatedTeamData.name}
              onChange={(e) =>
                setUpdatedTeamData({ ...updatedTeamData, name: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              value={updatedTeamData.description}
              onChange={(e) =>
                setUpdatedTeamData({ ...updatedTeamData, description: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleUpdateTeam}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
