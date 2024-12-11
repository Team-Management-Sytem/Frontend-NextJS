import React, { useState } from 'react';

interface Team {
  id: number;
  name: string;
  description: string;
}

interface TeamListProps {
  teams: Team[];
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
  onCreate: () => void;
}

const TeamList: React.FC<TeamListProps> = ({
  teams,
  onDelete,
  onCreate,
  onSelect,
}) => {
  const [hoveredTeamId, setHoveredTeamId] = useState<number | null>(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Teams</h2>
      <div className="space-y-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect(team.id)}
            onMouseEnter={() => setHoveredTeamId(team.id)}
            onMouseLeave={() => setHoveredTeamId(null)}
          >
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-800 font-medium">{team.name}</span>
            </div>

            {hoveredTeamId === team.id && (
              <button
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(team.id);
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_39_179"
                    style={{ maskType: 'alpha' }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_39_179)">
                    <path
                      d="M7.83334 13.75L10 11.5833L12.1667 13.75L13.3333 12.5833L11.1667 10.4167L13.3333 8.25L12.1667 7.08333L10 9.25L7.83334 7.08333L6.66667 8.25L8.83334 10.4167L6.66667 12.5833L7.83334 13.75ZM5.83334 17.5C5.375 17.5 4.98264 17.3368 4.65625 17.0104C4.32986 16.684 4.16667 16.2917 4.16667 15.8333V5H3.33334V3.33333H7.5V2.5H12.5V3.33333H16.6667V5H15.8333V15.8333C15.8333 16.2917 15.6701 16.684 15.3438 17.0104C15.0174 17.3368 14.625 17.5 14.1667 17.5H5.83334ZM14.1667 5H5.83334V15.8333H14.1667V5Z"
                      fill="#FF0000"
                    />
                  </g>
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div
        className="flex items-center cursor-pointer p-3 rounded-md text-blue-500 hover:bg-gray-100 mt-4"
        onClick={onCreate}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Create New</span>
      </div>
    </div>
  );
};

export default TeamList;
