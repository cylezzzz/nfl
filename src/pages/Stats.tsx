import React from 'react';
import StatTable from '../components/StatTable';
import { players } from '../data/mockData';
import { BarChart3, TrendingUp } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <BarChart3 className="text-green-400" size={32} />
          <h1 className="text-4xl font-bold text-white">NFL Statistics</h1>
        </div>
        <p className="text-white/70 text-lg">
          Leading player statistics and performance metrics across the league
        </p>
      </div>

      {/* Season Leaders */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="text-yellow-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Season Leaders</h2>
        </div>
        
        <div className="space-y-8">
          <StatTable 
            players={players}
            statType="passing"
            title="Passing Yards Leaders"
          />
          <StatTable 
            players={players}
            statType="rushing"
            title="Rushing Yards Leaders"
          />
          <StatTable 
            players={players}
            statType="receiving"
            title="Receiving Yards Leaders"
          />
        </div>
      </section>

      {/* Filter Options */}
      <section>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-white font-bold text-lg mb-4">Filter Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="2024">2024 Season</option>
              <option value="2023">2023 Season</option>
            </select>
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="all">All Weeks</option>
              <option value="1">Week 1</option>
              <option value="2">Week 2</option>
            </select>
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="all">All Positions</option>
              <option value="QB">Quarterback</option>
              <option value="RB">Running Back</option>
              <option value="WR">Wide Receiver</option>
            </select>
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="all">All Teams</option>
              <option value="afc">AFC</option>
              <option value="nfc">NFC</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;