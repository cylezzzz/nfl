import React from 'react';
import { Player } from '../types';

interface StatTableProps {
  players: Player[];
  statType: 'passing' | 'rushing' | 'receiving';
  title: string;
}

const StatTable: React.FC<StatTableProps> = ({ players, statType, title }) => {
  const getStatValue = (player: Player) => {
    switch (statType) {
      case 'passing':
        return player.passingYards || 0;
      case 'rushing':
        return player.rushingYards || 0;
      case 'receiving':
        return player.receivingYards || 0;
      default:
        return 0;
    }
  };

  const sortedPlayers = players
    .filter(player => getStatValue(player) > 0)
    .sort((a, b) => getStatValue(b) - getStatValue(a))
    .slice(0, 10);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-2 text-white/70 text-sm uppercase tracking-wide">Rank</th>
              <th className="text-left py-2 text-white/70 text-sm uppercase tracking-wide">Player</th>
              <th className="text-left py-2 text-white/70 text-sm uppercase tracking-wide">Team</th>
              <th className="text-right py-2 text-white/70 text-sm uppercase tracking-wide">Yards</th>
              <th className="text-right py-2 text-white/70 text-sm uppercase tracking-wide">TDs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {sortedPlayers.map((player, index) => (
              <tr key={player.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 text-white font-bold">{index + 1}</td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{player.name}</span>
                    <span className="text-white/60 text-sm">#{player.number}</span>
                  </div>
                  <div className="text-white/70 text-sm">{player.position}</div>
                </td>
                <td className="py-3 text-white/70 uppercase text-sm font-medium">
                  {player.teamId.toUpperCase()}
                </td>
                <td className="py-3 text-white text-right font-bold">
                  {getStatValue(player).toLocaleString()}
                </td>
                <td className="py-3 text-white text-right">
                  {player.touchdowns}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatTable;