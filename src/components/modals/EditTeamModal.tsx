'use client';

import React, { useState } from 'react';

interface Team {
  id: number;
  name: string;
  description: string;
}

interface EditTeamModalProps {
  team: Team;
  isOpen: boolean;
  onClose: () => void;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({ team, isOpen, onClose }) => {
  const [updatedTeamData, setUpdatedTeamData] = useState({ 
    name: team.name, 
    description: team.description 
  });

  const handleUpdateTeam = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8888/api/teams/${team.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeamData),
      });

      if (!response.ok) {
        alert('Failed to update team');
        return;
      }

      onClose();
      window.location.reload();
    } catch (error) {
      alert('Error updating team');
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
              onChange={(e) => setUpdatedTeamData({ ...updatedTeamData, name: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              value={updatedTeamData.description}
              onChange={(e) => setUpdatedTeamData({ ...updatedTeamData, description: e.target.value })}
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