'use client';

import React, { useEffect, useState } from 'react';
import CreateTaskModal from '@/components/modals/CreateTaskModal';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onCreateTask: (newTask: Task) => void;
  selectedTeamId: number;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onCreateTask,
  selectedTeamId,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-500 text-white text-sm px-3 mt-2 py-1.5 rounded-full inline-flex justify-center items-center';
      case 'Not Started':
        return 'bg-red-500 text-white text-sm px-3 mt-2 py-1.5 rounded-full inline-flex justify-center items-center';
      case 'Done':
        return 'bg-green-500 text-white text-sm px-3 mt-2 py-1.5 rounded-full inline-flex justify-center items-center';
      default:
        return 'bg-gray-500 text-white text-sm px-3 mt-2 py-1.5 rounded-full inline-flex justify-center items-center';
    }
  };

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  interface User {
    id: number;
    name: string;
    email: string;
  }

  const [teamUsers, setTeamUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTeamUsers = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8888/api/teams/${selectedTeamId}/users`,
        );
        const data = await response.json();
        if (data.users) {
          setTeamUsers(data.users);
        }
      } catch (error) {
        alert('Error fetching team users');
      }
    };

    fetchTeamUsers();
  }, [selectedTeamId]);

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/teams/${selectedTeamId}/users/${userId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        alert('Failed to delete user');
        return;
      }

      alert('User deleted successfully');
      setTeamUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId),
      );
    } catch (error) {
      alert('Error deleting user');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mt-6 mb-4">Team Members</h3>
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg mb-14">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-left">
              Name
            </th>
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-left">
              Email
            </th>
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {teamUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                {user.name}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                {user.email}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
        Tasks
        <button
          className="bg-blue-500 text-sm font-normal text-white px-4 py-2 rounded"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          Create Task
        </button>
      </h3>

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreateTask={onCreateTask}
        selectedTeamId={selectedTeamId}
      />

      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg mb-5 mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 rounded-tl-lg text-left">
              Title
            </th>
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-left">
              Description
            </th>
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-left">
              Status
            </th>
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-left">
              Assigned User
            </th>
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 text-left">
              Due Date
            </th>
            <th className="px-4 py-2 border-b text-sm font-medium text-gray-700 rounded-tr-lg text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                {task.title}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                {task.description}
              </td>
              <td
                className={`px-2 py-2 border-b text-sm ${getStatusColor(
                  task.status,
                )}`}
              >
                {task.status}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                {task.user?.name || 'No user assigned'}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                {new Date(task.due_date).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b text-sm">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;