// src/services/enhancedESPNApi.ts - Erweiterte ESPN API für echte NFL Daten
export interface LiveGame {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    abbreviation: string;
    score: number;
    logo: string;
    record: string;
  };
  awayTeam: {
    id: string;
    name: string;
    abbreviation: string;
    score: number;
    logo: string;
    record: string;
  };
  status: {
    type: string;
    detail: string;
    period?: number;
    clock?: string;
  };
  venue: string;
  date: string;
  week: number;
  isPlayoff: boolean;
}

export interface PlayerStats {
  id: string;
  name: string;
  position: string;
  team: string;
  stats: {
    passingYards?: number;
    rushingYards?: number;
    receivingYards?: number;
    touchdowns?: number;
    completions?: number;
    attempts?: number;
    interceptions?: number;
  };
}

export interface NFLNews {
  id: string;
  headline: string;
  description: string;
  published: string;
  image?: string;
  link: string;
}

class EnhancedESPNApiService {
  private baseUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';
  private coreUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl';
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  // Cache-Management
  private getFromCache(key: string) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  private setCache(key: string, data: any, ttl = 5 * 60 * 1000) {
    this.cache.set(key, { data, timestamp: Date.now(), ttl });
  }

  private async fetchWithCache(url: string, cacheKey: string, ttl?: number) {
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      console.log(`📦 ESPN Cache hit: ${cacheKey}`);
      return cached;
    }

    console.log(`🔄 ESPN API: ${url}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'NFL-Analytics-App/1.0',
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`ESPN API Error: ${response.status}`);
    }
    
    const data = await response.json();
    this.setCache(cacheKey, data, ttl);
    return data;
  }

  // LIVE SPIELE & SCORES
  async getLiveGames(): Promise<LiveGame[]> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/scoreboard`,
        'live_games',
        30 * 1000 // 30 Sekunden Cache für Live-Daten
      );

      return (data.events || []).map(this.mapEventToLiveGame);
    } catch (error) {
      console.error('❌ Error fetching live games:', error);
      return [];
    }
  }

  // PLAYOFF SPIELE
  async getPlayoffGames(): Promise<LiveGame[]> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/scoreboard?seasontype=3`, // 3 = Postseason
        'playoff_games',
        2 * 60 * 1000 // 2 Minuten Cache
      );

      return (data.events || []).map(this.mapEventToLiveGame);
    } catch (error) {
      console.error('❌ Error fetching playoff games:', error);
      return [];
    }
  }

  // WEEKLY GAMES
  async getWeekGames(year: number, week: number): Promise<LiveGame[]> {
    try {
      const seasonType = week > 18 ? 3 : 2; // Postseason vs Regular
      const actualWeek = week > 18 ? week - 18 : week;
      
      const data = await this.fetchWithCache(
        `${this.baseUrl}/seasons/${year}/types/${seasonType}/weeks/${actualWeek}`,
        `week_games_${year}_${week}`,
        10 * 60 * 1000 // 10 Minuten Cache
      );

      return (data.events || []).map(this.mapEventToLiveGame);
    } catch (error) {
      console.error(`❌ Error fetching week ${week} games:`, error);
      return [];
    }
  }

  // PLAYER STATISTICS
  async getPlayerLeaders(category: string = 'passingYards'): Promise<PlayerStats[]> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/leaders?category=${category}`,
        `leaders_${category}`,
        15 * 60 * 1000 // 15 Minuten Cache
      );

      const leaders = data.categories?.[0]?.leaders?.[0]?.leaders || [];
      return leaders.slice(0, 20).map(this.mapLeaderToPlayerStats);
    } catch (error) {
      console.error(`❌ Error fetching ${category} leaders:`, error);
      return [];
    }
  }

  // NFL NEWS
  async getNFLNews(limit: number = 10): Promise<NFLNews[]> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/news?limit=${limit}`,
        'nfl_news',
        5 * 60 * 1000 // 5 Minuten Cache
      );

      return (data.articles || []).slice(0, limit).map(this.mapArticleToNews);
    } catch (error) {
      console.error('❌ Error fetching NFL news:', error);
      return [];
    }
  }

  // TEAM STANDINGS
  async getStandings(year: number = 2024): Promise<any[]> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/seasons/${year}/types/2/groups`,
        `standings_${year}`,
        30 * 60 * 1000 // 30 Minuten Cache
      );

      return data.children || [];
    } catch (error) {
      console.error('❌ Error fetching standings:', error);
      return [];
    }
  }

  // INJURY REPORTS
  async getInjuryReport(teamId: string): Promise<any[]> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/teams/${teamId}/injuries`,
        `injuries_${teamId}`,
        60 * 60 * 1000 // 1 Stunde Cache
      );

      return data.injuries || [];
    } catch (error) {
      console.error(`❌ Error fetching injuries for team ${teamId}:`, error);
      return [];
    }
  }

  // TEAM SCHEDULE
  async getTeamSchedule(teamId: string, year: number = 2024): Promise<LiveGame[]> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/teams/${teamId}/schedule?season=${year}`,
        `schedule_${teamId}_${year}`,
        60 * 60 * 1000 // 1 Stunde Cache
      );

      return (data.events || []).map(this.mapEventToLiveGame);
    } catch (error) {
      console.error(`❌ Error fetching schedule for team ${teamId}:`, error);
      return [];
    }
  }

  // MAPPER FUNCTIONS
  private mapEventToLiveGame = (event: any): LiveGame => {
    const competition = event.competitions?.[0];
    const homeTeam = competition?.competitors?.find((c: any) => c.homeAway === 'home');
    const awayTeam = competition?.competitors?.find((c: any) => c.homeAway === 'away');

    const isPlayoff = event.season?.type === 3;
    let week = event.week?.number || 1;
    if (isPlayoff) week += 18; // Playoff weeks start at 19

    return {
      id: event.id,
      homeTeam: {
        id: homeTeam?.team?.id || '',
        name: homeTeam?.team?.displayName || '',
        abbreviation: homeTeam?.team?.abbreviation || '',
        score: parseInt(homeTeam?.score || '0'),
        logo: homeTeam?.team?.logo || '',
        record: homeTeam?.team?.record?.items?.[0]?.summary || '0-0'
      },
      awayTeam: {
        id: awayTeam?.team?.id || '',
        name: awayTeam?.team?.displayName || '',
        abbreviation: awayTeam?.team?.abbreviation || '',
        score: parseInt(awayTeam?.score || '0'),
        logo: awayTeam?.team?.logo || '',
        record: awayTeam?.team?.record?.items?.[0]?.summary || '0-0'
      },
      status: {
        type: event.status?.type?.name || 'scheduled',
        detail: event.status?.type?.shortDetail || '',
        period: event.status?.period,
        clock: event.status?.displayClock
      },
      venue: competition?.venue?.fullName || 'TBD',
      date: event.date,
      week,
      isPlayoff
    };
  };

  private mapLeaderToPlayerStats = (leader: any): PlayerStats => {
    const athlete = leader.athlete;
    const team = leader.team;
    
    return {
      id: athlete?.id || '',
      name: athlete?.displayName || '',
      position: athlete?.position?.abbreviation || '',
      team: team?.abbreviation || '',
      stats: {
        passingYards: leader.categories?.find((c: any) => c.name === 'passingYards')?.value,
        rushingYards: leader.categories?.find((c: any) => c.name === 'rushingYards')?.value,
        receivingYards: leader.categories?.find((c: any) => c.name === 'receivingYards')?.value,
        touchdowns: leader.categories?.find((c: any) => c.name === 'touchdowns')?.value,
        completions: leader.categories?.find((c: any) => c.name === 'completions')?.value,
        attempts: leader.categories?.find((c: any) => c.name === 'attempts')?.value,
        interceptions: leader.categories?.find((c: any) => c.name === 'interceptions')?.value,
      }
    };
  };

  private mapArticleToNews = (article: any): NFLNews => ({
    id: article.id || '',
    headline: article.headline || '',
    description: article.description || '',
    published: article.published || '',
    image: article.images?.[0]?.url,
    link: article.links?.web?.href || ''
  });

  // BATCH REQUESTS für bessere Performance
  async getBatchData() {
    try {
      const [liveGames, news, standings] = await Promise.all([
        this.getLiveGames(),
        this.getNFLNews(5),
        this.getStandings()
      ]);

      return {
        liveGames,
        news,
        standings,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('❌ Error in batch data fetch:', error);
      return {
        liveGames: [],
        news: [],
        standings: [],
        lastUpdated: new Date()
      };
    }
  }

  // PLAYOFF BRACKET DATA
  async getPlayoffBracket(): Promise<any> {
    try {
      const data = await this.fetchWithCache(
        `${this.baseUrl}/seasons/2024/types/3/groups/1`,
        'playoff_bracket',
        60 * 60 * 1000 // 1 Stunde Cache
      );

      return data;
    } catch (error) {
      console.error('❌ Error fetching playoff bracket:', error);
      return null;
    }
  }

  // CLEAR CACHE (für Development/Debugging)
  clearCache() {
    this.cache.clear();
    console.log('🗑️ ESPN API Cache cleared');
  }

  // GET CACHE STATS
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

export const enhancedESPNApi = new EnhancedESPNApiService();