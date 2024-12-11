'use client';

import React from 'react';

interface Team {
  id: number;
  name: string;
  description: string;
}

interface TeamDetailsProps {
  team: Team | null;
  handleBack: () => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ team, handleBack }) => {
  if (!team) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{team.name}</h1>
      <p className="text-gray-600 mt-4">{team.description}</p>
      <button className="mt-4 text-blue-500" onClick={handleBack}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default TeamDetails;
