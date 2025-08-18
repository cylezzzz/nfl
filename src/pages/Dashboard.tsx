// src/pages/Dashboard.tsx - Enhanced Version
import React from "react";
import Layout from "../components/Layout";
import { fetchTodayScoreboard } from "../lib/espn";
import { todaysGames, predictions } from "../data/mockData";
import { TrendingUp, Clock, MapPin, Users } from "lucide-react";

export default function Dashboard() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updated, setUpdated] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showMockData, setShowMockData] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTodayScoreboard();
        const liveEvents = data?.events ?? [];
        
        if (liveEvents.length === 0) {
          // Fallback zu Mock-Playoff-Daten wenn keine Live-Spiele
          setShowMockData(true);
          setEvents([]);
        } else {
          setEvents(liveEvents);
        }
        setUpdated(new Date());
      } catch (e: any) {
        setError(e?.message || "Failed to load scoreboard");
        setShowMockData(true); // Bei Fehler auch Mock-Daten anzeigen
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Auto-refresh alle 30 Sekunden für Live-Spiele
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const LiveBadge = ({ status }: { status: string }) => (
    <div className="flex items-center space-x-2">
      {status.toLowerCase().includes('live') || status.toLowerCase().includes('in progress') ? (
        <>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-bold text-sm">LIVE</span>
        </>
      ) : status.toLowerCase().includes('final') ? (
        <>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-400 font-bold text-sm">FINAL</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-blue-400 font-bold text-sm">SCHEDULED</span>
        </>
      )}
    </div>
  );

  const GameCard = ({ game, prediction }: { game: any, prediction?: any }) => {
    const c = game.competitions?.[0];
    const home = c?.competitors?.find((x: any) => x.homeAway === "home");
    const away = c?.competitors?.find((x: any) => x.homeAway === "away");
    const status = game.status?.type?.shortDetail || "";

    return (
      <div className="group rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition-all duration-300 p-4 hover:border-slate-600">
        <div className="flex items-center justify-between text-sm mb-3">
          <LiveBadge status={status} />
          <div className="flex items-center text-slate-400 space-x-1">
            <Clock size={14} />
            <span>{new Date(game.date).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={away?.team?.logo || `/teams/${away?.team?.abbreviation}.png`}
                alt={away?.team?.displayName}
                className="max-h-10 max-w-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    `https://a.espncdn.com/i/teamlogos/nfl/500/${away?.team?.abbreviation?.toLowerCase()}.png`;
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-white truncate">{away?.team?.displayName}</div>
              <div className="text-xs text-slate-400">{away?.team?.abbreviation}</div>
            </div>
            <div className="ml-auto text-2xl font-bold text-white">
              {away?.score ?? "-"}
            </div>
          </div>

          <div className="text-slate-500 mx-4">@</div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="mr-auto text-2xl font-bold text-white">
              {home?.score ?? "-"}
            </div>
            <div className="text-right">
              <div className="font-semibold text-white truncate">{home?.team?.displayName}</div>
              <div className="text-xs text-slate-400">{home?.team?.abbreviation}</div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={home?.team?.logo || `/teams/${home?.team?.abbreviation}.png`}
                alt={home?.team?.displayName}
                className="max-h-10 max-w-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    `https://a.espncdn.com/i/teamlogos/nfl/500/${home?.team?.abbreviation?.toLowerCase()}.png`;
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <MapPin size={12} />
            <span>{c?.venue?.fullName || "TBD"}</span>
          </div>
          
          {prediction && (
            <div className="flex items-center space-x-1 text-purple-400">
              <TrendingUp size={12} />
              <span>Prediction: {prediction.confidence}%</span>
            </div>
          )}
        </div>

        {prediction && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <div className="flex justify-between text-xs">
              <span className="text-blue-400">
                {away?.team?.abbreviation}: {prediction.awayWinProbability}%
              </span>
              <span className="text-red-400">
                {home?.team?.abbreviation}: {prediction.homeWinProbability}%
              </span>
            </div>
            <div className="mt-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-red-500"
                style={{ 
                  background: `linear-gradient(to right, #3b82f6 ${prediction.awayWinProbability}%, #ef4444 ${prediction.awayWinProbability}%)`
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const MockGameCard = ({ game, prediction }: { game: any, prediction: any }) => (
    <div className="group rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition-all duration-300 p-4 hover:border-slate-600">
      <div className="flex items-center justify-between text-sm mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-blue-400 font-bold text-sm">PLAYOFF</span>
        </div>
        <div className="flex items-center text-slate-400 space-x-1">
          <Clock size={14} />
          <span>{game.date} • {game.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src={game.awayTeam.logo}
              alt={`${game.awayTeam.city} ${game.awayTeam.name}`}
              className="max-h-10 max-w-10 object-contain"
            />
          </div>
          <div>
            <div className="font-semibold text-white">{game.awayTeam.city} {game.awayTeam.name}</div>
            <div className="text-xs text-slate-400">{game.awayTeam.abbreviation}</div>
          </div>
          <div className="ml-auto text-2xl font-bold text-white">-</div>
        </div>

        <div className="text-slate-500 mx-4">@</div>

        <div className="flex items-center space-x-3 flex-1 justify-end">
          <div className="mr-auto text-2xl font-bold text-white">-</div>
          <div className="text-right">
            <div className="font-semibold text-white">{game.homeTeam.city} {game.homeTeam.name}</div>
            <div className="text-xs text-slate-400">{game.homeTeam.abbreviation}</div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src={game.homeTeam.logo}
              alt={`${game.homeTeam.city} ${game.homeTeam.name}`}
              className="max-h-10 max-w-10 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
        <div className="flex items-center space-x-1">
          <MapPin size={12} />
          <span>{game.venue}</span>
        </div>
        <div className="flex items-center space-x-1 text-purple-400">
          <TrendingUp size={12} />
          <span>AI Prediction: {prediction.confidence}%</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-700">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-blue-400">
            {game.awayTeam.abbreviation}: {prediction.awayWinProbability}%
          </span>
          <span className="text-red-400">
            {game.homeTeam.abbreviation}: {prediction.homeWinProbability}%
          </span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-red-500"
            style={{ 
              background: `linear-gradient(to right, #3b82f6 ${prediction.awayWinProbability}%, #ef4444 ${prediction.awayWinProbability}%)`
            }}
          />
        </div>
        <div className="text-center text-sm text-purple-400">
          Predicted: {prediction.predictedScore.away} - {prediction.predictedScore.home}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to NFL Analytics</h1>
          <p className="text-slate-300 mb-6">
            Your ultimate destination for NFL insights, predictions, and statistics.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {updated ? (
              <span className="px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-300 text-sm">
                ✅ Live Data • Updated {updated.toLocaleTimeString()}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                🔄 Refreshing…
              </span>
            )}
            
            {showMockData && (
              <span className="px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 text-sm">
                🏆 Playoff Games (Mock Data)
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-slate-400">
            <Users size={16} />
            <span className="text-sm">2024/25 NFL Season</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {showMockData ? "Upcoming Playoff Games" : "Today's Games"}
          </h2>
          
          {loading && (
            <div className="text-slate-300">Loading games...</div>
          )}
          
          {error && !showMockData && (
            <div className="text-red-400 mb-4">⚠️ {error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            {showMockData ? (
              // Zeige Mock-Playoff-Daten
              todaysGames.map((game, index) => (
                <MockGameCard 
                  key={game.id} 
                  game={game} 
                  prediction={predictions[index]} 
                />
              ))
            ) : (
              // Zeige Live ESPN-Daten
              events.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            )}
          </div>

          {!loading && !error && events.length === 0 && !showMockData && (
            <div className="text-center py-8 text-slate-300">
              <p className="mb-4">No games scheduled today.</p>
              <button 
                onClick={() => setShowMockData(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                Show Upcoming Playoff Games
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">32</div>
            <div className="text-sm text-slate-400">NFL Teams</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-green-400">18</div>
            <div className="text-sm text-slate-400">Regular Weeks</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">14</div>
            <div className="text-sm text-slate-400">Playoff Teams</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-red-400">4</div>
            <div className="text-sm text-slate-400">Playoff Rounds</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}