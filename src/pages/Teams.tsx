import React from 'react';
import TeamCard from '../components/TeamCard';
import { teams } from '../data/mockData';
import { Users } from 'lucide-react';

const Teams: React.FC = () => {
  const afcTeams = teams.filter(team => team.conference === 'AFC');
  const nfcTeams = teams.filter(team => team.conference === 'NFC');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Users className="text-blue-400" size={32} />
          <h1 className="text-4xl font-bold text-white">NFL Teams</h1>
        </div>
        <p className="text-white/70 text-lg">
          Explore all 32 NFL teams, their records, and divisional standings
        </p>
      </div>

      {/* AFC Conference */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            AFC Conference
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {afcTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>

      {/* NFC Conference */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
            NFC Conference
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfcTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Teams;