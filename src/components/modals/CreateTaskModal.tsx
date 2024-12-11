'use client';

import { Task } from '@/types';
import React, { useState } from 'react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (newTask: Task) => void;
  selectedTeamId: number;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreateTask, 
  selectedTeamId 
}) => {
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    status: 'Not Started',
    due_date: '',
    teams_id: Number(selectedTeamId),
  });

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
        onClose();
        window.location.reload();
      } catch (parseError) {
        alert(`Error parsing response: ${parseError}`);
      }
    } catch (error) {
      alert(`Error creating task: ${error}`);
    }
  };

  if (!isOpen) return null;

  return (
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
            onClick={onClose}
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
  );
};

export default CreateTaskModal;