'use client';
import * as React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  teams_id: number;
}

import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};

const TaskCard = ({ task }: { task: Task }) => {
  let statusColor = '';

  switch (task.status.toLowerCase()) {
    case 'not started':
      statusColor = 'bg-red-500';
      break;
    case 'done':
      statusColor = 'bg-green-500';
      break;
    case 'in progress':
      statusColor = 'bg-yellow-500';
      break;
    default:
      statusColor = 'bg-gray-500';
      break;
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-4 flex flex-col justify-between h-[150px] w-full">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
        </div>
        <div
          className={`text-sm font-semibold text-white py-1 px-3 rounded-full ${statusColor} self-center`}
        >
          {task.status}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      <div className="mt-2">
        <div className="text-sm text-gray-600">Due Date: {new Date(task.due_date).toLocaleString()}</div>
        <div className="text-sm text-gray-600">Team ID: {task.teams_id}</div>
      </div>
    </div>
  );
};

export default TaskCard;
