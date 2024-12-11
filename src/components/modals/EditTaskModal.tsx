'use client';

import React, { useEffect, useState } from 'react';

import { Task } from '@/app/team/[id]/page';

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, task, onClose, onSave, onDelete }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(task);
  const [users, setUsers] = useState<{ id: string, name: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setEditingTask(task);
      
      fetch(`http://127.0.0.1:8888/api/teams/${task.teams_id}/users`)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.users || []);
        })
        .catch(() => alert('Failed to fetch users'));
    }
  }, [task]);

  if (!isOpen || !editingTask) return null;

  const handleSave = () => {
    if (editingTask) {
      if (editingTask.user && editingTask.user.id) {
        fetch(`http://127.0.0.1:8888/api/tasks/${editingTask.id}/remove`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: editingTask.user.id,
          }),
        })
          .then(() => {
            if (selectedUserId) {
              fetch(`http://127.0.0.1:8888/api/tasks/${editingTask.id}/assign`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_id: selectedUserId,
                }),
              })
                .then(() => {
                  const formattedDueDate = new Date(editingTask.due_date).toISOString();

                  onSave({
                    ...editingTask,
                    due_date: formattedDueDate,
                    user: users.find((user) => user.id === selectedUserId) || undefined,
                  });
                })
                .catch(() => alert('Failed to assign user'));
            }
          })
          .catch(() => alert('Failed to remove current assignee'));
      } else {
        if (selectedUserId) {
          fetch(`http://127.0.0.1:8888/api/tasks/${editingTask.id}/assign`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: selectedUserId,
            }),
          })
            .then(() => {
              const formattedDueDate = new Date(editingTask.due_date).toISOString();

              onSave({
                ...editingTask,
                due_date: formattedDueDate,
                user: users.find((user) => user.id === selectedUserId) || undefined,
              });
            })
            .catch(() => alert('Failed to assign user'));
        }
      }
    }
  };

  const handleDelete = () => {
    if (editingTask) {
      fetch(`http://127.0.0.1:8888/api/tasks/${editingTask.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          onDelete(editingTask.id);
          onClose();
        })
        .catch(() => alert('Failed to delete task'));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-red-500 text-sm underline"
          onClick={handleDelete}
        >
          Delete Task
        </button>
        <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              value={editingTask?.title || ''}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              value={editingTask?.description || ''}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <select
              value={editingTask?.status || 'Not Started'}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date:</label>
            <input
              type="datetime-local"
              value={editingTask?.due_date || ''}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setEditingTask({ ...editingTask, due_date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Edit Assignee:</label>
            <select
              value={selectedUserId || ''}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.length === 0 ? (
                <option value="">No members yet</option>
              ) : (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
