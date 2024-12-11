'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
}

interface AddUserModalProps {
  teamId: number;
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ teamId, isOpen, onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

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
      const response = await fetch(`http://127.0.0.1:8888/api/teams/${teamId}/users/${selectedUserId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        alert('Failed to add user to team');
        return;
      }

      alert('User added to team successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Error adding user to team');
    }
  };

  if (!isOpen) return null;

  return (
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
            onClick={onClose}
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
  );
};

export default AddUserModal;