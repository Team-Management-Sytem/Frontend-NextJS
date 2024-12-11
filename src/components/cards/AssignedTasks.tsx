'use client';

import React from 'react';

import TaskCard from '@/components/cards/card';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  teams_id: number;
}

interface AssignedTasksProps {
  tasks: Task[];
}

const AssignedTasks: React.FC<AssignedTasksProps> = ({ tasks }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No tasks assigned</p>
      )}
    </div>
  );
};

export default AssignedTasks;
