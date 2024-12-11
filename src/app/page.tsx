'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { deleteTeam, fetchTeam, fetchTeams } from '@/lib/api';

import AssignedTasks from '@/components/ui/AssignedTasks';
import Sidebar from '@/components/ui/Sidebar';

import { getAssignedTasks } from '@/app/services/taskService';
import { getUserData } from '@/app/services/userService';

interface Team {
  id: number;
  name: string;
  description: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  teams_id: number;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  telp_number: string;
  role: string;
  image_url: string;
  is_verified: boolean;
}

const HomePage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
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
          getAssignedTasks(data.id, token)
            .then((tasks) => {
              setAssignedTasks(tasks);
            })
            .catch(() => {
              alert('Error fetching assigned tasks');
            });
        })
        .catch(() => {
          // Error handling
        });
    }
  }, []);

  useEffect(() => {
    if (id) {
      const getTeam = async () => {
        try {
          const response = await fetchTeam(Number(id));
          setSelectedTeam(response.data);
        } catch (error) {
          alert('Error fetching team data');
        }
      };
      getTeam();
    }
  }, [id]);

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

  const handleSelectTeam = async (id: number) => {
    try {
      const response = await fetchTeam(id);
      setSelectedTeam(response.data);
      router.push(`/team/${id}`);
    } catch (error) {
      alert('Error fetching team data');
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

      <main className='flex-1 bg-gray-100 p-6'>
        <h3 className='text-xl text-blue-500 font-semibold mb-4'>Tasks Assigned to You</h3>
        <AssignedTasks tasks={assignedTasks} />
      </main>
    </div>
  );
};

export default HomePage;
