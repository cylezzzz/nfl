import React from "react";
import { Link } from "react-router-dom";
import { Team } from "../types";

type Props = {
  team: Team;
};

export default function TeamCard({ team }: Props) {
  return (
    <Link 
      to={`/teams/${team.id}`}
      className="block bg-gradient-to-br from-slate-800 to-slate-700 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-slate-700 hover:to-slate-600 w-full"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src={team.logo}
            alt={`${team.name} logo`}
            className="w-10 h-10 object-contain"
            onError={(e) => {
              // Fallback zu Emoji wenn Logo nicht lädt
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = '<div class="text-3xl">🏈</div>';
            }}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">
            {team.city} {team.name}
          </h2>
          <p className="text-sm text-gray-300">{team.abbreviation} · {team.division}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center text-gray-200">
        <span className="font-semibold">
          {team.wins}-{team.losses}{team.ties > 0 ? `-${team.ties}` : ""}
        </span>
        <span className="text-green-400 font-medium">
          {((team.wins / (team.wins + team.losses + team.ties)) * 100).toFixed(1)}%
        </span>
      </div>
    </Link>
  );
}