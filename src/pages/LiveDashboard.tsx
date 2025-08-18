// src/pages/LiveDashboard.tsx - Dashboard mit echten ESPN API Daten
import React from "react";
import Layout from "../components/Layout";
import { useLiveNFL, useLiveScores, useNFLNews } from "../hooks/useLiveNFL";
import { LiveGame, NFLNews } from "../services/enhancedESPNApi";
import { 
  Clock, 
  MapPin, 
  Users, 
  TrendingUp, 
  Zap, 
  RefreshCw,
  Wifi,
  WifiOff,
  AlertCircle,
  Trophy,
  Calendar
} from "lucide-react";

export default function LiveDashboard() {
  const {
    liveGames,
    playoffGames,
    todaysGames,
    liveActiveGames,
    scheduledGames,
    completedGames,
    news,
    passingLeaders,
    rushingLeaders,
    receivingLeaders,
    loading,
    error,
    lastUpdated,
    isLive,
    isDataFresh,
    dataAge,
    refresh,
    totalGames,
    hasData
  } = useLiveNFL({
    autoRefresh: true,
    refreshInterval: 30, // 30 Sekunden
    includePlayoffs: true,
    includeNews: true,
    includeStandings: true
  });

  // Schnelle Live-Scores (15s Updates)
  const { scores: quickScores } = useLiveScores();

  const formatTimeAgo = (seconds: number | null) => {
    if (!seconds) return 'Never';
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const StatusBadge = ({ isLive, isDataFresh, error }: {
    isLive: boolean;
    isDataFresh: boolean;
    error: string | null;
  }) => {
    if (error) {
      return (
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-red-900/40 text-red-300">
          <WifiOff size={14} />
          <span className="text-sm">API Error</span>
        </div>
      );
    }

    if (isLive) {
      return (
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-red-900/40 text-red-300">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold">LIVE GAMES</span>
        </div>
      );
    }

    if (isDataFresh) {
      return (
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-900/40 text-green-300">
          <Wifi size={14} />
          <span className="text-sm">Live Data</span>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow-900/40 text-yellow-300">
        <AlertCircle size={14} />
        <span className="text-sm">Cached Data</span>
      </div>
    );
  };

  const LiveGameCard = ({ game }: { game: LiveGame }) => {
    const isLiveGame = game.status.type.includes('IN_PROGRESS') || game.status.type.includes('HALFTIME');
    const isCompleted = game.status.type.includes('FINAL');
    
    return (
      <div className={`group rounded-xl border transition-all duration-300 p-4 ${
        isLiveGame 
          ? 'border-red-500 bg-red-900/20 hover:bg-red-900/30' 
          : isCompleted
          ? 'border-green-500/50 bg-slate-900/60 hover:bg-slate-900'
          : 'border-slate-700 bg-slate-900/60 hover:bg-slate-900'
      }`}>
        
        {/* Status Header */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center space-x-2">
            {isLiveGame ? (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold">LIVE</span>
                {game.status.period && (
                  <span className="text-slate-400">
                    Q{game.status.period} {game.status.clock}
                  </span>
                )}
              </>
            ) : isCompleted ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-bold">FINAL</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-400 font-bold">
                  {game.isPlayoff ? 'PLAYOFF' : 'SCHEDULED'}
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center text-slate-400 space-x-1">
            <Clock size={12} />
            <span>{new Date(game.date).toLocaleString()}</span>
          </div>
        </div>

        {/* Teams & Scores */}
        <div className="flex items-center justify-between mb-3">
          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={game.awayTeam.logo}
                alt={game.awayTeam.name}
                className="max-h-10 max-w-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    `https://a.espncdn.com/i/teamlogos/nfl/500/${game.awayTeam.abbreviation.toLowerCase()}.png`;
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-white">{game.awayTeam.name}</div>
              <div className="text-xs text-slate-400">{game.awayTeam.record}</div>
            </div>
            <div className="ml-auto text-2xl font-bold text-white">
              {isCompleted || isLiveGame ? game.awayTeam.score : '-'}
            </div>
          </div>

          <div className="text-slate-500 mx-4">@</div>

          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="mr-auto text-2xl font-bold text-white">
              {isCompleted || isLiveGame ? game.homeTeam.score : '-'}
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">{game.homeTeam.name}</div>
              <div className="text-xs text-slate-400">{game.homeTeam.record}</div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={game.homeTeam.logo}
                alt={game.homeTeam.name}
                className="max-h-10 max-w-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    `https://a.espncdn.com/i/teamlogos/nfl/500/${game.homeTeam.abbreviation.toLowerCase()}.png`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <MapPin size={12} />
            <span>{game.venue}</span>
          </div>
          
          {game.isPlayoff && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <Trophy size={12} />
              <span>Playoff</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PlayerLeaderCard = ({ title, players, statKey }: {
    title: string;
    players: any[];
    statKey: string;
  }) => (
    <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4">
      <h3 className="font-semibold text-white mb-3">{title}</h3>
      <div className="space-y-2">
        {players.slice(0, 5).map((player, index) => (
          <div key={player.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm w-4">{index + 1}</span>
              <div>
                <div className="text-white text-sm font-medium">{player.name}</div>
                <div className="text-slate-400 text-xs">{player.team} • {player.position}</div>
              </div>
            </div>
            <div className="text-white font-bold">
              {player.stats[statKey]?.toLocaleString() || '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NewsCard = ({ article }: { article: NFLNews }) => (
    <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 hover:border-slate-600 transition-all">
      <div className="flex space-x-3">
        {article.image && (
          <img 
            src={article.image}
            alt={article.headline}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm leading-tight mb-1">
            {article.headline}
          </h4>
          <p className="text-slate-400 text-xs line-clamp-2 mb-2">
            {article.description}
          </p>
          <div className="text-slate-500 text-xs">
            {new Date(article.published).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">NFL Live Dashboard</h1>
            <p className="text-slate-300">
              Real-time NFL scores, stats, and updates powered by ESPN API
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <StatusBadge isLive={isLive} isDataFresh={isDataFresh} error={error} />
            
            {lastUpdated && (
              <span className="text-slate-400 text-sm">
                Updated {formatTimeAgo(dataAge)}
              </span>
            )}
            
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && !hasData && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-300">Loading live NFL data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/40 border border-red-500/50 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle size={20} />
              <span className="font-medium">API Error</span>
            </div>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{liveActiveGames.length}</div>
            <div className="text-sm text-slate-400">Live Games</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{scheduledGames.length}</div>
            <div className="text-sm text-slate-400">Scheduled</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{completedGames.length}</div>
            <div className="text-sm text-slate-400">Completed</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{playoffGames.length}</div>
            <div className="text-sm text-slate-400">Playoff Games</div>
          </div>
        </div>

        {/* Live Games Priority */}
        {liveActiveGames.length > 0 && (
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="text-red-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Live Games</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-red-400/50 to-transparent ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveActiveGames.map(game => (
                <LiveGameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Today's Games */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-white">
              {todaysGames.length > 0 ? "Today's Games" : "Recent & Upcoming Games"}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {(todaysGames.length > 0 ? todaysGames : [...playoffGames, ...liveGames].slice(0, 6))
              .map(game => (
                <LiveGameCard key={game.id} game={game} />
              ))}
          </div>
          
          {todaysGames.length === 0 && liveGames.length === 0 && playoffGames.length === 0 && !loading && (
            <div className="text-center py-8 text-slate-300">
              <Calendar className="mx-auto mb-4 text-slate-500" size={48} />
              <p>No games scheduled for today.</p>
              <p className="text-sm text-slate-400 mt-1">Check back later for updates!</p>
            </div>
          )}
        </section>

        {/* Player Leaders & News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Leaders */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">2024 Season Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PlayerLeaderCard 
                title="Passing Yards" 
                players={passingLeaders} 
                statKey="passingYards" 
              />
              <PlayerLeaderCard 
                title="Rushing Yards" 
                players={rushingLeaders} 
                statKey="rushingYards" 
              />
              <PlayerLeaderCard 
                title="Receiving Yards" 
                players={receivingLeaders} 
                statKey="receivingYards" 
              />
            </div>
          </div>

          {/* NFL News */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Latest NFL News</h2>
            <div className="space-y-3">
              {news.slice(0, 5).map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}