import React from "react";
import { Team } from "../types";

type Props = {
  team: Team;
};

export default function TeamCard({ team }: Props) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 rounded-xl shadow hover:shadow-lg transition w-full">
      <div className="flex items-center gap-4">
        <img
          src={team.logo}
          alt={`${team.name} logo`}
          className="w-12 h-12 object-contain"
        />
        <div>
          <h2 className="text-lg font-bold text-white">
            {team.city} {team.name}
          </h2>
          <p className="text-sm text-gray-300">{team.abbreviation} · {team.division}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-gray-200">
        <span className="font-semibold">
          {team.wins}-{team.losses}{team.ties > 0 ? `-${team.ties}` : ""}
        </span>
      </div>
    </div>
  );
}
