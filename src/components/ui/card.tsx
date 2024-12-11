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
    <div className="shadow-lg border border-gray-200 flex flex-col justify-between h-[250px] w-full bg-white rounded-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm text-gray-500 mt-2">{task.description}</p>
      </div>
      <div className="p-4 border-t">
        <div className="mt-2 text-sm text-gray-600">Due Date: {new Date(task.due_date).toLocaleString()}</div>
        <div className="mt-1 text-sm text-gray-600">Team ID: {task.teams_id}</div>
        <div className={`mt-2 text-white text-sm font-semibold py-1 px-2 rounded ${statusColor}`}>
          {task.status}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
