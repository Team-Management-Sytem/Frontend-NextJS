'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { deleteTeam, fetchTeam, fetchTeams } from '@/lib/api';

import EditTaskModal from '@/components/modals/EditTaskModal';
import Sidebar from '@/components/sidebar/Sidebar';
import TaskList from '@/components/cards/TaskList';
import TeamDetails from '@/components/cards/TeamDetails';

import { getUserData } from '@/app/services/userService';

export interface UserData {
  id: string;
  name: string;
  email: string;
  telp_number: string;
  role: string;
  image_url: string;
  is_verified: boolean;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  users: UserData[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  teams_id: number;
  user?: {
    id: string;
    name: string;
  };
}

const TeamPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [loadingTeams, setLoadingTeams] = useState(true);
  interface UserData {
    id: string;
    name: string;
    email: string;
  }
  const [userData, setUserData] = useState<UserData | null>(null);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    async function getTeams() {
      try {
        const response = await fetchTeams();
        setTeams(response.data);
      } catch (error) {
        alert('Error fetching data');
      } finally {
        setLoadingTeams(false);
      }
    }
    getTeams();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserData(token)
        .then((data) => {
          setUserData(data);
        })
        .catch(() => {
          alert('Error fetching user data');
        });
    }
  }, []);

  useEffect(() => {
    if (id) {
      const getTeam = async () => {
        try {
          const response = await fetchTeam(Number(id));
          setSelectedTeam(response.data);

          const tasksResponse = await fetch(
            `http://localhost:8888/api/tasks/team/${id}`,
          );
          const tasksData = await tasksResponse.json();

          if (tasksData.data && tasksData.data.length > 0) {
            setAssignedTasks(tasksData.data);
          } else {
            setAssignedTasks([]);
          }
        } catch (error) {
          alert('Error fetching team or tasks data');
        }
      };
      getTeam();
    }
  }, [id]);

  const handleSelectTeam = async (id: number) => {
    try {
      const response = await fetchTeam(id);
      setSelectedTeam(response.data);
      router.push(`/team/${id}`);
    } catch (error) {
      alert('Error fetching team data');
    }
  };

  const handleDeleteTeam = async (id: number) => {
    try {
      await deleteTeam(id);
      setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
      if (selectedTeam?.id === id) {
        setSelectedTeam(null);
      }
    } catch (error) {
      alert('Error deleting team');
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setAssignedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId),
    );
  };

  const handleCreateTask = (newTask: Task) => {
    // Update tasks state with the newly created task
    setAssignedTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveChanges = async (updatedTask: Task) => {
    try {
      const response = await fetch(
        `http://localhost:8888/api/tasks/${updatedTask.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
            due_date: updatedTask.due_date,
            teams_id: selectedTeam?.id,
          }),
        },
      );
      if (response.ok) {
        setAssignedTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          ),
        );
        setIsModalOpen(false);
      } else {
        alert('Failed to update task');
      }
    } catch (error) {
      alert('Error updating task');
    }
  };

  return (
    <div className='flex h-screen'>
      <Sidebar
        teams={teams}
        loadingTeams={loadingTeams}
        userData={userData}
        handleSelectTeam={handleSelectTeam}
        handleDeleteTeam={handleDeleteTeam}
      />

      <main className='flex-1 bg-gray-100 p-14'>
        {selectedTeam ? (
          <div>
            <TeamDetails team={selectedTeam} handleBack={handleBack} />
            <TaskList
              tasks={assignedTasks}
              onEdit={handleEditTask}
              onCreateTask={handleCreateTask}
              selectedTeamId={selectedTeam.id}
            />
            <EditTaskModal
              isOpen={isModalOpen}
              task={editingTask}
              onClose={handleCloseModal}
              onSave={handleSaveChanges}
              onDelete={handleDeleteTask}
            />
          </div>
        ) : (
          <p>Team not found</p>
        )}
      </main>
    </div>
  );
};

export default TeamPage;
