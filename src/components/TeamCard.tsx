// src/components/TeamCard.tsx
import { Link } from "react-router-dom";

export default function TeamCard({ team }) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="group rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-4 flex items-center gap-3 transition"
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <img
          src={team.logo}
          alt={`${team.display} logo`}
          className="max-h-12 max-w-12 object-contain"
          onError={(e) => {
            e.currentTarget.src = `https://a.espncdn.com/i/teamlogos/nfl/500/${team.abbr.toLowerCase()}.png`;
          }}
        />
      </div>
      <div>
        <div className="text-white font-semibold leading-tight">
          {team.city} {team.name}
        </div>
        <div className="text-xs text-slate-300">{team.abbr}</div>
      </div>
    </Link>
  );
}
