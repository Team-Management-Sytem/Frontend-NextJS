import axios from 'axios';


export const getAssignedTasks = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`${'http://localhost:8888/api/tasks/assigned/'}${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching assigned tasks');
  }
};
