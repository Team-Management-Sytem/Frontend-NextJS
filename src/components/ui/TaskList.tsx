'use client';

import React from 'react';

import type { Task } from '@/app/team/[id]/page';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void; 
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit }) => {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-500'; 
      case 'Not Started':
        return 'bg-red-500'; 
      case 'Done':
        return 'bg-green-500'; 
      default:
        return 'bg-gray-500'; 
    }
  };
  

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Tasks</h3>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Assigned User</th>
            <th className="px-4 py-2 border">Due Date</th> 
            <th className="px-4 py-2 border">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-4 py-2 border">{task.title}</td>
              <td className="px-4 py-2 border">{task.description}</td>
              <td className={`px-4 py-2 border ${getStatusColor(task.status)}`}>{task.status}</td>
              <td className="px-4 py-2 border">{task.user?.name || 'No user assigned'}</td>
              <td className="px-4 py-2 border">{new Date(task.due_date).toLocaleString()}</td> 
              <td className="px-4 py-2 border">
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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
