'use client';

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
  const [updatedTeamData, setUpdatedTeamData] = useState({ name: '', description: '' });
  const [users, setUsers] = useState<{ id: string, name: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  if (!team) return null;

  const handleEditClick = () => {
    setUpdatedTeamData({ name: team.name, description: team.description });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

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

      setIsEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert('Error updating team');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8888/api/user');
      const data = await response.json();
      if (data.status && data.data) {
        setUsers(data.data);
      }
    } catch (error) {
      alert('Error fetching users');
    }
  };

  const handleAddUserToTeam = async () => {
    if (!selectedUserId) {
      alert('Please select a user to add');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8888/api/teams/${team.id}/users/${selectedUserId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        alert('Failed to add user to team');
        return;
      }

      alert('User added to team successfully');
      setIsAddUserModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert('Error adding user to team');
    }
  };

  const handleAddUserClick = () => {
    fetchUsers();
    setIsAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
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
          Edit Team {/* Edit button */}
        </button>
      </div>

      <p className="text-gray-600 mt-4">{team.description}</p>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddUserClick}
        >
          <i className="fas fa-plus"></i> Add User to Team {/* Plus icon inside button */}
        </button>
      </div>

      {isEditModalOpen && (
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
                onClick={handleCloseModal}
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
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Add User to Team</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select User:</label>
                <select
                  value={selectedUserId || ''}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleCloseAddUserModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddUserToTeam}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
