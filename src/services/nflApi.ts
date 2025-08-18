// src/services/nflApi.ts
import { Player, Game, Team } from '../types';

const NFL_API_BASE = 'https://api.nfl.com/v1';
const ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';

// NFL.com Team IDs mapping zu unseren IDs
const NFL_TEAM_MAPPING: Record<string, string> = {
  'buf': 'BUF',
  'mia': 'MIA',
  'ne': 'NE',
  'nyj': 'NYJ',
  'bal': 'BAL',
  'cin': 'CIN',
  'cle': 'CLE',
  'pit': 'PIT',
  'hou': 'HOU',
  'ind': 'IND',
  'jax': 'JAX',
  'ten': 'TEN',
  'den': 'DEN',
  'kc': 'KC',
  'lv': 'LV',
  'lac': 'LAC',
  'dal': 'DAL',
  'nyg': 'NYG',
  'phi': 'PHI',
  'was': 'WAS',
  'chi': 'CHI',
  'det': 'DET',
  'gb': 'GB',
  'min': 'MIN',
  'atl': 'ATL',
  'car': 'CAR',
  'no': 'NO',
  'tb': 'TB',
  'ari': 'ARI',
  'lar': 'LAR',
  'sf': 'SF',
  'sea': 'SEA'
};

interface ESPNPlayer {
  id: string;
  displayName: string;
  jersey: string;
  position: {
    abbreviation: string;
  };
  team: {
    abbreviation: string;
  };
  statistics?: Array<{
    name: string;
    displayValue: string;
    value: number;
  }>;
}

interface ESPNGame {
  id: string;
  date: string;
  status: {
    type: {
      name: string;
      state: string;
      description: string;
    };
    period: number;
    clock: string;
  };
  competitions: Array<{
    competitors: Array<{
      team: {
        id: string;
        abbreviation: string;
        displayName: string;
        logo: string;
        record: {
          items: Array<{
            summary: string;
          }>;
        };
      };
      homeAway: string;
      score: string;
      winner?: boolean;
    }>;
    venue: {
      fullName: string;
    };
    notes?: Array<{
      headline: string;
    }>;
  }>;
  week: {
    number: number;
  };
  season: {
    year: number;
    type: number; // 1=preseason, 2=regular, 3=postseason
  };
}

class NFLApiService {
  private async fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
    try {
      console.log(`🔄 Fetching NFL data from: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`⚠️ API call failed: ${response.status}, using fallback data`);
        return fallbackData;
      }
      const data = await response.json();
      console.log(`✅ Successfully fetched NFL data`);
      return data;
    } catch (error) {
      console.warn(`❌ API call error: ${error}, using fallback data`);
      return fallbackData;
    }
  }

  async getTeamRoster(teamId: string): Promise<Player[]> {
    const nflTeamId = NFL_TEAM_MAPPING[teamId];
    if (!nflTeamId) return [];

    // 2024/25 Season specific fallback players
    const fallbackPlayers: Player[] = this.generateFallbackPlayers(teamId);

    const url = `${ESPN_API_BASE}/teams/${nflTeamId}/roster`;
    
    try {
      const data = await this.fetchWithFallback(url, { athletes: [] });
      
      if (!data.athletes || data.athletes.length === 0) {
        return fallbackPlayers;
      }

      return data.athletes.slice(0, 15).map((player: ESPNPlayer) => ({
        id: player.id,
        name: player.displayName,
        position: player.position.abbreviation,
        number: parseInt(player.jersey) || 0,
        teamId,
        passingYards: this.getPlayerStat(player, 'passing') || undefined,
        rushingYards: this.getPlayerStat(player, 'rushing') || undefined,
        receivingYards: this.getPlayerStat(player, 'receiving') || undefined,
        touchdowns: this.getPlayerStat(player, 'touchdowns') || Math.floor(Math.random() * 10)
      }));
    } catch (error) {
      console.error(`❌ Error fetching roster for ${teamId}:`, error);
      return fallbackPlayers;
    }
  }

  private generateFallbackPlayers(teamId: string): Player[] {
    // 2024/25 Season-spezifische Fallback-Spieler basierend auf echten NFL Stars
    const teamSpecificPlayers: Record<string, Player[]> = {
      'buf': [
        { id: `${teamId}-allen`, name: 'Josh Allen', position: 'QB', number: 17, teamId, passingYards: 4306, rushingYards: 523, touchdowns: 43 },
        { id: `${teamId}-diggs`, name: 'Stefon Diggs', position: 'WR', number: 14, teamId, receivingYards: 1183, touchdowns: 8 },
        { id: `${teamId}-cook`, name: 'James Cook', position: 'RB', number: 4, teamId, rushingYards: 1009, touchdowns: 16 }
      ],
      'kc': [
        { id: `${teamId}-mahomes`, name: 'Patrick Mahomes', position: 'QB', number: 15, teamId, passingYards: 3928, touchdowns: 26 },
        { id: `${teamId}-kelce`, name: 'Travis Kelce', position: 'TE', number: 87, teamId, receivingYards: 823, touchdowns: 3 },
        { id: `${teamId}-hopkins`, name: 'DeAndre Hopkins', position: 'WR', number: 8, teamId, receivingYards: 1057, touchdowns: 8 }
      ],
      'det': [
        { id: `${teamId}-goff`, name: 'Jared Goff', position: 'QB', number: 16, teamId, passingYards: 4629, touchdowns: 37 },
        { id: `${teamId}-gibbs`, name: 'Jahmyr Gibbs', position: 'RB', number: 26, teamId, rushingYards: 1412, receivingYards: 516, touchdowns: 20 },
        { id: `${teamId}-stbrown`, name: 'Amon-Ra St. Brown', position: 'WR', number: 14, teamId, receivingYards: 1263, touchdowns: 12 }
      ],
      'phi': [
        { id: `${teamId}-hurts`, name: 'Jalen Hurts', position: 'QB', number: 1, teamId, passingYards: 3858, rushingYards: 630, touchdowns: 29 },
        { id: `${teamId}-barkley`, name: 'Saquon Barkley', position: 'RB', number: 26, teamId, rushingYards: 2005, receivingYards: 278, touchdowns: 15 },
        { id: `${teamId}-brown`, name: 'A.J. Brown', position: 'WR', number: 11, teamId, receivingYards: 1079, touchdowns: 7 }
      ],
      'bal': [
        { id: `${teamId}-jackson`, name: 'Lamar Jackson', position: 'QB', number: 8, teamId, passingYards: 3678, rushingYards: 915, touchdowns: 44 },
        { id: `${teamId}-henry`, name: 'Derrick Henry', position: 'RB', number: 22, teamId, rushingYards: 1921, touchdowns: 16 },
        { id: `${teamId}-flowers`, name: 'Zay Flowers', position: 'WR', number: 4, teamId, receivingYards: 1059, touchdowns: 4 }
      ]
    };

    return teamSpecificPlayers[teamId] || [
      { id: `${teamId}-qb1`, name: 'Starting QB', position: 'QB', number: 1, teamId, passingYards: Math.floor(Math.random() * 2000) + 2500, touchdowns: Math.floor(Math.random() * 15) + 15 },
      { id: `${teamId}-rb1`, name: 'Starting RB', position: 'RB', number: 2, teamId, rushingYards: Math.floor(Math.random() * 800) + 800, touchdowns: Math.floor(Math.random() * 10) + 8 },
      { id: `${teamId}-wr1`, name: 'Starting WR', position: 'WR', number: 3, teamId, receivingYards: Math.floor(Math.random() * 700) + 900, touchdowns: Math.floor(Math.random() * 8) + 6 }
    ];
  }

  private getPlayerStat(player: ESPNPlayer, statType: string): number | undefined {
    if (!player.statistics) return undefined;
    
    const statMap: Record<string, string[]> = {
      passing: ['passingYards', 'passing yards', 'pass yards'],
      rushing: ['rushingYards', 'rushing yards', 'rush yards'],
      receiving: ['receivingYards', 'receiving yards', 'rec yards'],
      touchdowns: ['touchdowns', 'TDs', 'TD', 'total touchdowns']
    };

    const statNames = statMap[statType] || [];
    
    for (const stat of player.statistics) {
      if (statNames.some(name => stat.name.toLowerCase().includes(name.toLowerCase()))) {
        return stat.value || parseInt(stat.displayValue.replace(/,/g, '')) || 0;
      }
    }
    
    return undefined;
  }

  async getCurrentGames(): Promise<Game[]> {
    // Playoff-spezifische Fallback-Spiele für Januar 2025
    const fallbackGames: Game[] = [
      {
        id: 'playoff_fallback_1',
        homeTeam: this.getTeamData('kc'),
        awayTeam: this.getTeamData('hou'),
        date: '2025-01-18',
        time: '16:30',
        week: 19, // Divisional Round
        season: 2024,
        status: 'scheduled',
        venue: 'Arrowhead Stadium'
      },
      {
        id: 'playoff_fallback_2',
        homeTeam: this.getTeamData('buf'),
        awayTeam: this.getTeamData('bal'),
        date: '2025-01-19',
        time: '18:30',
        week: 19,
        season: 2024,
        status: 'scheduled',
        venue: 'Highmark Stadium'
      }
    ];

    // Versuche aktuelle Playoff-Spiele zu laden
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Januar = 1

    let url = `${ESPN_API_BASE}/scoreboard`;
    
    // Für Playoffs (Januar/Februar) spezielle Parameter
    if (currentMonth <= 2) {
      url += `?dates=${currentYear}${currentMonth.toString().padStart(2, '0')}`;
    }
    
    try {
      const data = await this.fetchWithFallback(url, { events: [] });
      
      if (!data.events || data.events.length === 0) {
        console.log('🏈 No live games found, using playoff fallback games');
        return fallbackGames;
      }

      const games = data.events.map((game: ESPNGame) => this.mapESPNGameToGame(game));
      console.log(`🏈 Found ${games.length} current NFL games`);
      return games;
    } catch (error) {
      console.error('❌ Error fetching current games:', error);
      return fallbackGames;
    }
  }

  private mapESPNGameToGame(espnGame: ESPNGame): Game {
    const competition = espnGame.competitions[0];
    const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
    const awayTeam = competition.competitors.find(c => c.homeAway === 'away');
    
    if (!homeTeam || !awayTeam) {
      throw new Error('Invalid game data');
    }

    const gameDate = new Date(espnGame.date);
    let status: 'scheduled' | 'live' | 'completed' = 'scheduled';
    
    if (espnGame.status.type.state === 'post') {
      status = 'completed';
    } else if (espnGame.status.type.state === 'in') {
      status = 'live';
    }

    // Bestimme Woche basierend auf Saison-Typ
    let week = espnGame.week.number;
    if (espnGame.season.type === 3) { // Postseason
      week = 18 + week; // Playoffs starten bei Woche 19
    }

    return {
      id: espnGame.id,
      homeTeam: this.mapTeamFromESPN(homeTeam.team),
      awayTeam: this.mapTeamFromESPN(awayTeam.team),
      date: gameDate.toISOString().split('T')[0],
      time: gameDate.toTimeString().slice(0, 5),
      week,
      season: espnGame.season.year,
      homeScore: status === 'completed' || status === 'live' ? parseInt(homeTeam.score) || 0 : undefined,
      awayScore: status === 'completed' || status === 'live' ? parseInt(awayTeam.score) || 0 : undefined,
      status,
      venue: competition.venue.fullName
    };
  }

  private mapTeamFromESPN(espnTeam: any): Team {
    const teamId = Object.keys(NFL_TEAM_MAPPING).find(
      key => NFL_TEAM_MAPPING[key] === espnTeam.abbreviation
    );
    
    if (teamId) {
      return this.getTeamData(teamId);
    }

    // Fallback für unbekannte Teams
    return {
      id: espnTeam.abbreviation.toLowerCase(),
      name: espnTeam.displayName.split(' ').pop() || espnTeam.abbreviation,
      city: espnTeam.displayName.split(' ').slice(0, -1).join(' ') || espnTeam.abbreviation,
      abbreviation: espnTeam.abbreviation,
      division: 'Unknown',
      conference: 'Unknown',
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      logo: `/teams/${espnTeam.abbreviation}.png`,
      wins: 0, losses: 0, ties: 0
    };
  }

  private getTeamData(teamId: string): Team {
    // 2024/25 Season aktuelle Team-Daten (vereinfacht)
    const teamData: Record<string, Team> = {
      'kc': { id: 'kc', name: 'Chiefs', city: 'Kansas City', abbreviation: 'KC', division: 'AFC West', conference: 'AFC', primaryColor: '#E31837', secondaryColor: '#FFB612', logo: '/teams/KC.png', wins: 15, losses: 2, ties: 0 },
      'buf': { id: 'buf', name: 'Bills', city: 'Buffalo', abbreviation: 'BUF', division: 'AFC East', conference: 'AFC', primaryColor: '#00338D', secondaryColor: '#C60C30', logo: '/teams/BUF.png', wins: 13, losses: 4, ties: 0 },
      'det': { id: 'det', name: 'Lions', city: 'Detroit', abbreviation: 'DET', division: 'NFC North', conference: 'NFC', primaryColor: '#0076B6', secondaryColor: '#B0B7BC', logo: '/teams/DET.png', wins: 15, losses: 2, ties: 0 },
      'phi': { id: 'phi', name: 'Eagles', city: 'Philadelphia', abbreviation: 'PHI', division: 'NFC East', conference: 'NFC', primaryColor: '#004C54', secondaryColor: '#A5ACAF', logo: '/teams/PHI.png', wins: 14, losses: 3, ties: 0 },
      'min': { id: 'min', name: 'Vikings', city: 'Minnesota', abbreviation: 'MIN', division: 'NFC North', conference: 'NFC', primaryColor: '#4F2683', secondaryColor: '#FFC62F', logo: '/teams/MIN.png', wins: 14, losses: 3, ties: 0 },
      'bal': { id: 'bal', name: 'Ravens', city: 'Baltimore', abbreviation: 'BAL', division: 'AFC North', conference: 'AFC', primaryColor: '#241773', secondaryColor: '#000000', logo: '/teams/BAL.png', wins: 12, losses: 5, ties: 0 },
      'was': { id: 'was', name: 'Commanders', city: 'Washington', abbreviation: 'WAS', division: 'NFC East', conference: 'NFC', primaryColor: '#773141', secondaryColor: '#FFB612', logo: '/teams/WAS.png', wins: 12, losses: 5, ties: 0 },
      'hou': { id: 'hou', name: 'Texans', city: 'Houston', abbreviation: 'HOU', division: 'AFC South', conference: 'AFC', primaryColor: '#03202F', secondaryColor: '#A71930', logo: '/teams/HOU.png', wins: 10, losses: 7, ties: 0 },
      'lar': { id: 'lar', name: 'Rams', city: 'Los Angeles', abbreviation: 'LAR', division: 'NFC West', conference: 'NFC', primaryColor: '#003594', secondaryColor: '#FFA300', logo: '/teams/LAR.png', wins: 10, losses: 7, ties: 0 },
      'gb': { id: 'gb', name: 'Packers', city: 'Green Bay', abbreviation: 'GB', division: 'NFC North', conference: 'NFC', primaryColor: '#203731', secondaryColor: '#FFB612', logo: '/teams/GB.png', wins: 11, losses: 6, ties: 0 },
      'tb': { id: 'tb', name: 'Buccaneers', city: 'Tampa Bay', abbreviation: 'TB', division: 'NFC South', conference: 'NFC', primaryColor: '#D50A0A', secondaryColor: '#34302B', logo: '/teams/TB.png', wins: 10, losses: 7, ties: 0 },
      'den': { id: 'den', name: 'Broncos', city: 'Denver', abbreviation: 'DEN', division: 'AFC West', conference: 'AFC', primaryColor: '#FB4F14', secondaryColor: '#002244', logo: '/teams/DEN.png', wins: 10, losses: 7, ties: 0 },
      'pit': { id: 'pit', name: 'Steelers', city: 'Pittsburgh', abbreviation: 'PIT', division: 'AFC North', conference: 'AFC', primaryColor: '#FFB612', secondaryColor: '#101820', logo: '/teams/PIT.png', wins: 10, losses: 7, ties: 0 },
      'lac': { id: 'lac', name: 'Chargers', city: 'Los Angeles', abbreviation: 'LAC', division: 'AFC West', conference: 'AFC', primaryColor: '#0080C6', secondaryColor: '#FFC20E', logo: '/teams/LAC.png', wins: 11, losses: 6, ties: 0 }
    };
    
    return teamData[teamId] || {
      id: teamId,
      name: teamId.toUpperCase(),
      city: teamId.toUpperCase(),
      abbreviation: teamId.toUpperCase(),
      division: 'Unknown',
      conference: 'Unknown',
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      logo: `/teams/${teamId.toUpperCase()}.png`,
      wins: 0, losses: 0, ties: 0
    };
  }

  async getAllPlayers(): Promise<Player[]> {
    const allPlayers: Player[] = [];
    const priorityTeams = ['kc', 'buf', 'det', 'phi', 'min', 'bal', 'was', 'hou']; // Playoff teams first
    const otherTeams = Object.keys(NFL_TEAM_MAPPING).filter(id => !priorityTeams.includes(id));
    const teamIds = [...priorityTeams, ...otherTeams];
    
    console.log(`🏈 Loading players for ${teamIds.length} NFL teams...`);
    
    // Lade Spieler für alle Teams (mit Rate Limiting)
    for (let i = 0; i < teamIds.length; i++) {
      try {
        const teamPlayers = await this.getTeamRoster(teamIds[i]);
        allPlayers.push(...teamPlayers);
        
        // Rate limiting - längere Pausen für Live-APIs
        if (i < teamIds.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200)); // 200ms zwischen Teams
        }
        
        // Progress logging
        if ((i + 1) % 8 === 0) {
          console.log(`📊 Loaded players for ${i + 1}/${teamIds.length} teams`);
        }
      } catch (error) {
        console.error(`❌ Error loading players for team ${teamIds[i]}:`, error);
      }
    }
    
    console.log(`✅ Loaded ${allPlayers.length} total NFL players`);
    return allPlayers;
  }

  // Spezielle Methode für Playoff-Updates
  async getPlayoffGames(): Promise<Game[]> {
    const url = `${ESPN_API_BASE}/scoreboard?seasontype=3&week=1`; // Postseason Week 1 = Wild Card
    
    try {
      const data = await this.fetchWithFallback(url, { events: [] });
      
      if (!data.events || data.events.length === 0) {
        console.log('🏆 No playoff games found');
        return [];
      }

      return data.events.map((game: ESPNGame) => this.mapESPNGameToGame(game));
    } catch (error) {
      console.error('❌ Error fetching playoff games:', error);
      return [];
    }
  }

  // Live-Updates für laufende Spiele
  async getLiveGameUpdates(gameId: string): Promise<Game | null> {
    const url = `${ESPN_API_BASE}/summary?event=${gameId}`;
    
    try {
      const data = await this.fetchWithFallback(url, null);
      
      if (!data || !data.header) {
        return null;
      }

      return this.mapESPNGameToGame(data.header);
    } catch (error) {
      console.error(`❌ Error fetching live updates for game ${gameId}:`, error);
      return null;
    }
  }

  // Injury Report Integration
  async getInjuryReport(teamId: string): Promise<any[]> {
    const nflTeamId = NFL_TEAM_MAPPING[teamId];
    if (!nflTeamId) return [];

    // Simulierte Injury Reports für realistischere Vorhersagen
    const mockInjuries = [
      { player: 'Key Player', status: 'Questionable', injury: 'Knee' },
      { player: 'Backup RB', status: 'Out', injury: 'Hamstring' }
    ];

    return mockInjuries;
  }

  // Weather Data für Spiele
  async getGameWeather(venue: string, date: string): Promise<any> {
    // Vereinfachte Weather-Simulation
    const outdoorVenues = [
      'Arrowhead Stadium', 'Highmark Stadium', 'Lambeau Field', 
      'M&T Bank Stadium', 'Soldier Field', 'FirstEnergy Stadium'
    ];

    if (!outdoorVenues.some(v => venue.includes(v))) {
      return { conditions: 'Dome', temperature: 72, wind: 0 };
    }

    // Simuliere Januar-Wetter für Playoffs
    return {
      conditions: 'Cold',
      temperature: Math.floor(Math.random() * 20) + 20, // 20-40°F
      wind: Math.floor(Math.random() * 15) + 5, // 5-20 mph
      precipitation: Math.random() > 0.7 ? 'Snow' : 'Clear'
    };
  }

  // Team Rankings und Power Rankings
  async getTeamRankings(): Promise<Record<string, number>> {
    // NFL Power Rankings für 2024/25 Playoffs
    const powerRankings: Record<string, number> = {
      'det': 1,   // Lions
      'kc': 2,    // Chiefs  
      'buf': 3,   // Bills
      'phi': 4,   // Eagles
      'min': 5,   // Vikings
      'bal': 6,   // Ravens
      'was': 7,   // Commanders
      'hou': 8,   // Texans
      'gb': 9,    // Packers
      'lar': 10,  // Rams
      'pit': 11,  // Steelers
      'tb': 12,   // Buccaneers
      'den': 13,  // Broncos
      'lac': 14,  // Chargers
      // Non-playoff teams
      'cin': 15,
      'sea': 16,
      'atl': 17,
      'mia': 18,
      'ind': 19,
      'dal': 20,
      'ari': 21,
      'sf': 22,
      'chi': 23,
      'no': 24,
      'nyj': 25,
      'car': 26,
      'ne': 27,
      'lv': 28,
      'jax': 29,
      'cle': 30,
      'ten': 31,
      'nyg': 32
    };

    return powerRankings;
  }
}

export const nflApiService = new NFLApiService();