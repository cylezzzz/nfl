// src/hooks/useLiveNFL.ts - React Hook für echte NFL Live-Daten
import { useState, useEffect, useCallback } from 'react';
import { enhancedESPNApi, LiveGame, PlayerStats, NFLNews } from '../services/enhancedESPNApi';

interface LiveNFLState {
  // Games Data
  liveGames: LiveGame[];
  playoffGames: LiveGame[];
  weekGames: LiveGame[];
  
  // Player Data
  passingLeaders: PlayerStats[];
  rushingLeaders: PlayerStats[];
  receivingLeaders: PlayerStats[];
  
  // News & Info
  news: NFLNews[];
  standings: any[];
  
  // Status
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isLive: boolean;
}

interface UseLiveNFLOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // in seconds
  includePlayoffs?: boolean;
  includeNews?: boolean;
  includeStandings?: boolean;
  week?: number;
  year?: number;
}

export const useLiveNFL = (options: UseLiveNFLOptions = {}) => {
  const {
    autoRefresh = true,
    refreshInterval = 30, // 30 Sekunden Standard
    includePlayoffs = true,
    includeNews = true,
    includeStandings = true,
    week,
    year = 2024
  } = options;

  const [state, setState] = useState<LiveNFLState>({
    liveGames: [],
    playoffGames: [],
    weekGames: [],
    passingLeaders: [],
    rushingLeaders: [],
    receivingLeaders: [],
    news: [],
    standings: [],
    loading: true,
    error: null,
    lastUpdated: null,
    isLive: false
  });

  // Hauptdaten-Loading Funktion
  const loadData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Bestimme welche Daten geladen werden sollen
      const promises: Promise<any>[] = [];
      
      // 1. Live Games (immer laden)
      promises.push(enhancedESPNApi.getLiveGames());
      
      // 2. Playoff Games (wenn aktiviert)
      if (includePlayoffs) {
        promises.push(enhancedESPNApi.getPlayoffGames());
      }
      
      // 3. Woche-spezifische Games (wenn Woche angegeben)
      if (week) {
        promises.push(enhancedESPNApi.getWeekGames(year, week));
      }
      
      // 4. Player Leaders
      promises.push(enhancedESPNApi.getPlayerLeaders('passingYards'));
      promises.push(enhancedESPNApi.getPlayerLeaders('rushingYards'));
      promises.push(enhancedESPNApi.getPlayerLeaders('receivingYards'));
      
      // 5. News (wenn aktiviert)
      if (includeNews) {
        promises.push(enhancedESPNApi.getNFLNews(10));
      }
      
      // 6. Standings (wenn aktiviert)
      if (includeStandings) {
        promises.push(enhancedESPNApi.getStandings(year));
      }

      // Parallel laden für bessere Performance
      console.log(`🏈 Loading NFL data with ${promises.length} API calls...`);
      const results = await Promise.all(promises);
      
      let resultIndex = 0;
      const liveGames = results[resultIndex++];
      const playoffGames = includePlayoffs ? results[resultIndex++] : [];
      const weekGames = week ? results[resultIndex++] : [];
      const passingLeaders = results[resultIndex++];
      const rushingLeaders = results[resultIndex++];
      const receivingLeaders = results[resultIndex++];
      const news = includeNews ? results[resultIndex++] : [];
      const standings = includeStandings ? results[resultIndex++] : [];

      // Prüfe ob Live-Spiele laufen
      const hasLiveGames = liveGames.some((game: LiveGame) => 
        game.status.type.includes('STATUS_IN_PROGRESS') || 
        game.status.type.includes('STATUS_HALFTIME')
      );

      setState(prev => ({
        ...prev,
        liveGames,
        playoffGames,
        weekGames,
        passingLeaders,
        rushingLeaders,
        receivingLeaders,
        news,
        standings,
        loading: false,
        lastUpdated: new Date(),
        isLive: hasLiveGames
      }));

      console.log(`✅ NFL data loaded successfully:`, {
        liveGames: liveGames.length,
        playoffGames: playoffGames.length,
        weekGames: weekGames.length,
        passingLeaders: passingLeaders.length,
        news: news.length,
        isLive: hasLiveGames
      });

    } catch (error: any) {
      console.error('❌ Error loading NFL data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load NFL data'
      }));
    }
  }, [includePlayoffs, includeNews, includeStandings, week, year]);

  // Refresh-Funktion (manuell aufrufbar)
  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh Setup
  useEffect(() => {
    // Initial load
    loadData();

    if (!autoRefresh) return;

    // Setup Auto-refresh
    const interval = setInterval(() => {
      console.log(`🔄 Auto-refreshing NFL data (${refreshInterval}s interval)`);
      loadData();
    }, refreshInterval * 1000);

    return () => {
      clearInterval(interval);
      console.log('🛑 Auto-refresh stopped');
    };
  }, [loadData, autoRefresh, refreshInterval]);

  // Spezielle Funktionen für einzelne Datentypen
  const getGamesByStatus = useCallback((status: 'live' | 'scheduled' | 'completed') => {
    const allGames = [...state.liveGames, ...state.playoffGames, ...state.weekGames];
    
    switch (status) {
      case 'live':
        return allGames.filter(game => 
          game.status.type.includes('IN_PROGRESS') || 
          game.status.type.includes('HALFTIME')
        );
      case 'scheduled':
        return allGames.filter(game => 
          game.status.type.includes('SCHEDULED') || 
          game.status.type.includes('PRE')
        );
      case 'completed':
        return allGames.filter(game => 
          game.status.type.includes('FINAL') || 
          game.status.type.includes('POST')
        );
      default:
        return allGames;
    }
  }, [state.liveGames, state.playoffGames, state.weekGames]);

  const getTodaysGames = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const allGames = [...state.liveGames, ...state.playoffGames, ...state.weekGames];
    
    return allGames.filter(game => 
      game.date.startsWith(today)
    );
  }, [state.liveGames, state.playoffGames, state.weekGames]);

  const getPlayerLeadersByPosition = useCallback((position: 'QB' | 'RB' | 'WR') => {
    switch (position) {
      case 'QB':
        return state.passingLeaders;
      case 'RB':
        return state.rushingLeaders;
      case 'WR':
        return state.receivingLeaders;
      default:
        return [];
    }
  }, [state.passingLeaders, state.rushingLeaders, state.receivingLeaders]);

  // Data Freshness Check
  const isDataFresh = useCallback(() => {
    if (!state.lastUpdated) return false;
    const ageMinutes = (Date.now() - state.lastUpdated.getTime()) / (1000 * 60);
    return ageMinutes < 2; // Fresh für 2 Minuten
  }, [state.lastUpdated]);

  const getDataAge = useCallback(() => {
    if (!state.lastUpdated) return null;
    return Math.floor((Date.now() - state.lastUpdated.getTime()) / 1000);
  }, [state.lastUpdated]);

  return {
    // Core State
    ...state,
    
    // Utility Functions
    refresh,
    getGamesByStatus,
    getTodaysGames,
    getPlayerLeadersByPosition,
    isDataFresh: isDataFresh(),
    dataAge: getDataAge(),
    
    // Convenient getters
    todaysGames: getTodaysGames(),
    liveActiveGames: getGamesByStatus('live'),
    scheduledGames: getGamesByStatus('scheduled'),
    completedGames: getGamesByStatus('completed'),
    
    // Stats
    totalGames: state.liveGames.length + state.playoffGames.length + state.weekGames.length,
    hasData: state.liveGames.length > 0 || state.playoffGames.length > 0
  };
};

// Spezieller Hook nur für Live-Scores (lightweight)
export const useLiveScores = () => {
  const [scores, setScores] = useState<LiveGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadScores = useCallback(async () => {
    try {
      const games = await enhancedESPNApi.getLiveGames();
      setScores(games);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('❌ Error loading live scores:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScores();
    
    // Schnellere Updates für Live-Scores (15 Sekunden)
    const interval = setInterval(loadScores, 15000);
    return () => clearInterval(interval);
  }, [loadScores]);

  return {
    scores,
    loading,
    lastUpdated,
    liveGames: scores.filter(game => 
      game.status.type.includes('IN_PROGRESS') || 
      game.status.type.includes('HALFTIME')
    ),
    refresh: loadScores
  };
};

// Hook für Team-spezifische Daten
export const useTeamData = (teamId: string) => {
  const [teamData, setTeamData] = useState({
    schedule: [] as LiveGame[],
    injuries: [] as any[],
    loading: true
  });

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const [schedule, injuries] = await Promise.all([
          enhancedESPNApi.getTeamSchedule(teamId),
          enhancedESPNApi.getInjuryReport(teamId)
        ]);

        setTeamData({
          schedule,
          injuries,
          loading: false
        });
      } catch (error) {
        console.error(`❌ Error loading team data for ${teamId}:`, error);
        setTeamData(prev => ({ ...prev, loading: false }));
      }
    };

    if (teamId) {
      loadTeamData();
    }
  }, [teamId]);

  return teamData;
};

// Hook für NFL News
export const useNFLNews = (limit: number = 10) => {
  const [news, setNews] = useState<NFLNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await enhancedESPNApi.getNFLNews(limit);
        setNews(articles);
      } catch (error) {
        console.error('❌ Error loading NFL news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
    
    // News alle 10 Minuten aktualisieren
    const interval = setInterval(loadNews, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [limit]);

  return { news, loading };
};

// Performance Monitoring Hook
export const useAPIPerformance = () => {
  const [stats, setStats] = useState({
    cacheHits: 0,
    apiCalls: 0,
    avgResponseTime: 0,
    errors: 0
  });

  useEffect(() => {
    // Überwache API Performance
    const checkStats = () => {
      const cacheStats = enhancedESPNApi.getCacheStats();
      setStats(prev => ({
        ...prev,
        cacheHits: cacheStats.size
      }));
    };

    const interval = setInterval(checkStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};