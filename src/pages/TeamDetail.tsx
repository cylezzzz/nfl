import React from 'react';
import { useParams } from 'react-router-dom';
import { teams, players } from '../data/mockData';
import { ArrowLeft, Users, Calendar, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const team = teams.find(t => t.id === id);
  const teamPlayers = players.filter(p => p.teamId === id);

  if (!team) {
    return (
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold">Team not found</h1>
        <Link to="/teams" className="text-blue-400 hover:text-blue-300">
          Back to Teams
        </Link>
      </div>
    );
  }

  const winPercentage = ((team.wins / (team.wins + team.losses + team.ties)) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link 
        to="/teams" 
        className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Teams</span>
      </Link>

      {/* Team Header */}
      <div 
        className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
        style={{
          background: `linear-gradient(135deg, ${team.primaryColor}30 0%, ${team.secondaryColor}20 100%)`
        }}
      >
        <div className="flex items-center space-x-6">
          <div className="text-8xl">{team.logo}</div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">
              {team.city} {team.name}
            </h1>
            <div className="flex items-center space-x-6 text-white/70">
              <span>{team.conference} • {team.division}</span>
              <span className="font-bold text-white">
                {team.wins}-{team.losses}{team.ties > 0 && `-${team.ties}`}
              </span>
              <span>{winPercentage}% Win Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Stats */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="text-yellow-400" size={20} />
              <h3 className="text-white font-bold text-lg">Season Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Wins</span>
                <span className="text-white font-bold">{team.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Losses</span>
                <span className="text-white font-bold">{team.losses}</span>
              </div>
              {team.ties > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/70">Ties</span>
                  <span className="text-white font-bold">{team.ties}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-white/20">
                <span className="text-white/70">Win %</span>
                <span className="text-white font-bold">{winPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Division</span>
                <span className="text-white font-bold">{team.division.replace(`${team.conference} `, '')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roster */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="text-blue-400" size={20} />
              <h3 className="text-white font-bold text-lg">Key Players</h3>
            </div>
            {teamPlayers.length > 0 ? (
              <div className="space-y-4">
                {teamPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-white/70 font-mono text-sm min-w-[24px]">
                        #{player.number}
                      </div>
                      <div>
                        <div className="text-white font-bold">{player.name}</div>
                        <div className="text-white/70 text-sm">{player.position}</div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      {player.passingYards && (
                        <div className="text-white">
                          <span className="text-white/70">Passing:</span> {player.passingYards.toLocaleString()} yds
                        </div>
                      )}
                      {player.rushingYards && (
                        <div className="text-white">
                          <span className="text-white/70">Rushing:</span> {player.rushingYards.toLocaleString()} yds
                        </div>
                      )}
                      <div className="text-white">
                        <span className="text-white/70">TDs:</span> {player.touchdowns}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">No player data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;