const BASE_URL = 'http://127.0.0.1:8888';

export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/api/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks data');
  }
  return response.json();
}

export async function fetchTeams() {
  const response = await fetch(`${BASE_URL}/api/teams`);
  if (!response.ok) {
    throw new Error('Failed to fetch teams data');
  }
  return response.json();
}

export async function fetchTeam(id: number) {
  const response = await fetch(`${BASE_URL}/api/teams/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch teams data');
  }
  return response.json();
}

export async function deleteTeam(id: number) {
  if (!id) {
    throw new Error('Team ID is required to delete a team');
  }

  const response = await fetch(`${BASE_URL}/api/teams/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete team data');
  }

  return response.json();
}

export async function postTeam(data: { name: string; description: string }) {
  const response = await fetch(`${BASE_URL}/api/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create a new team');
  }

  return response.json();
}
