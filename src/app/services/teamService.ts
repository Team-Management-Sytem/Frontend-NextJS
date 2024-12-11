import { Team } from "@/types";

export const updateTeam = async (teamId: number, updatedTeamData: Team) => {
  try {
    const response = await fetch(`http://127.0.0.1:8888/api/teams/${teamId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTeamData),
    });

    if (!response.ok) {
      throw new Error('Failed to update team');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};