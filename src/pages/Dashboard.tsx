import React from 'react';
import GameCard from '../components/GameCard';
import { todaysGames, recentGames } from '../data/mockData';
import { Calendar, TrendingUp, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome to NFL Analytics
        </h1>
        <p className="text-white/70 text-lg">
          Your ultimate destination for NFL insights, predictions, and statistics
        </p>
      </div>

      {/* Today's Games */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Today's Games</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {todaysGames.map((game) => (
            <GameCard key={game.id} game={game} showPrediction />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="text-green-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Quick Stats</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm uppercase tracking-wide">
                  Games This Week
                </p>
                <p className="text-white text-3xl font-bold">16</p>
              </div>
              <div className="text-blue-400 text-4xl">📅</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm uppercase tracking-wide">
                  Predictions Made
                </p>
                <p className="text-white text-3xl font-bold">142</p>
              </div>
              <div className="text-green-400 text-4xl">🧠</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm uppercase tracking-wide">
                  Accuracy Rate
                </p>
                <p className="text-white text-3xl font-bold">73%</p>
              </div>
              <div className="text-yellow-400 text-4xl">🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="text-purple-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Recent Results</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;