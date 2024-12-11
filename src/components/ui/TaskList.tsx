'use client';

import React, { useEffect,useState } from 'react';

import { Task } from '@/app/team/[id]/page';

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
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    status: 'Not Started',
    due_date: '',
    teams_id: Number(selectedTeamId),
  });
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

  const handleCreateTaskSubmit = async () => {
    const formattedDueDate = new Date(newTaskData.due_date).toISOString();

    try {
      const response = await fetch('http://localhost:8888/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskData.title,
          description: newTaskData.description,
          status: newTaskData.status,
          due_date: formattedDueDate,
          teams_id: Number(selectedTeamId),
        }),
      });

      const responseBody = await response.text();

      if (!response.ok) {
        alert(`Request failed: ${response.status} - ${responseBody}`);
        return;
      }

      try {
        const createdTask = JSON.parse(responseBody);
        onCreateTask(createdTask);
        setIsCreateTaskModalOpen(false);
        window.location.reload();
      } catch (parseError) {
        alert(`Error parsing response: ${parseError}`);
      }
    } catch (error) {
      alert(`Error creating task: ${error}`);
    }
  };

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

      {isCreateTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-96 bg-white p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTaskData.title}
                  onChange={(e) =>
                    setNewTaskData({ ...newTaskData, title: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  placeholder="Task Description"
                  value={newTaskData.description}
                  onChange={(e) =>
                    setNewTaskData({
                      ...newTaskData,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  value={newTaskData.status}
                  onChange={(e) =>
                    setNewTaskData({ ...newTaskData, status: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date:
                </label>
                <input
                  type="datetime-local"
                  value={newTaskData.due_date}
                  onChange={(e) =>
                    setNewTaskData({ ...newTaskData, due_date: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsCreateTaskModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleCreateTaskSubmit}
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}

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
