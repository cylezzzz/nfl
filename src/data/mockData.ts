// src/data/mockData.ts - Updated for January 2025 NFL Playoffs
import { Team, Player, Game, Prediction } from '../types';

// NFL 2024/25 Season - Playoff Teams (Final Standings)
export const teams: Team[] = [
  // --- AFC PLAYOFF TEAMS ---
  {
    id: 'kc',
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#E31837',
    secondaryColor: '#FFB612',
    logo: '/teams/KC.png',
    wins: 15, losses: 2, ties: 0
  },
  {
    id: 'buf',
    name: 'Bills',
    city: 'Buffalo',
    abbreviation: 'BUF',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#00338D',
    secondaryColor: '#C60C30',
    logo: '/teams/BUF.png',
    wins: 13, losses: 4, ties: 0
  },
  {
    id: 'bal',
    name: 'Ravens',
    city: 'Baltimore',
    abbreviation: 'BAL',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#241773',
    secondaryColor: '#000000',
    logo: '/teams/BAL.png',
    wins: 12, losses: 5, ties: 0
  },
  {
    id: 'hou',
    name: 'Texans',
    city: 'Houston',
    abbreviation: 'HOU',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#03202F',
    secondaryColor: '#A71930',
    logo: '/teams/HOU.png',
    wins: 10, losses: 7, ties: 0
  },
  {
    id: 'pit',
    name: 'Steelers',
    city: 'Pittsburgh',
    abbreviation: 'PIT',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#FFB612',
    secondaryColor: '#101820',
    logo: '/teams/PIT.png',
    wins: 10, losses: 7, ties: 0
  },
  {
    id: 'lac',
    name: 'Chargers',
    city: 'Los Angeles',
    abbreviation: 'LAC',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#0080C6',
    secondaryColor: '#FFC20E',
    logo: '/teams/LAC.png',
    wins: 11, losses: 6, ties: 0
  },
  {
    id: 'den',
    name: 'Broncos',
    city: 'Denver',
    abbreviation: 'DEN',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#FB4F14',
    secondaryColor: '#002244',
    logo: '/teams/DEN.png',
    wins: 10, losses: 7, ties: 0
  },

  // --- NFC PLAYOFF TEAMS ---
  {
    id: 'det',
    name: 'Lions',
    city: 'Detroit',
    abbreviation: 'DET',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#0076B6',
    secondaryColor: '#B0B7BC',
    logo: '/teams/DET.png',
    wins: 15, losses: 2, ties: 0
  },
  {
    id: 'phi',
    name: 'Eagles',
    city: 'Philadelphia',
    abbreviation: 'PHI',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#004C54',
    secondaryColor: '#A5ACAF',
    logo: '/teams/PHI.png',
    wins: 14, losses: 3, ties: 0
  },
  {
    id: 'min',
    name: 'Vikings',
    city: 'Minnesota',
    abbreviation: 'MIN',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#4F2683',
    secondaryColor: '#FFC62F',
    logo: '/teams/MIN.png',
    wins: 14, losses: 3, ties: 0
  },
  {
    id: 'was',
    name: 'Commanders',
    city: 'Washington',
    abbreviation: 'WAS',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#773141',
    secondaryColor: '#FFB612',
    logo: '/teams/WAS.png',
    wins: 12, losses: 5, ties: 0
  },
  {
    id: 'tb',
    name: 'Buccaneers',
    city: 'Tampa Bay',
    abbreviation: 'TB',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#D50A0A',
    secondaryColor: '#34302B',
    logo: '/teams/TB.png',
    wins: 10, losses: 7, ties: 0
  },
  {
    id: 'lar',
    name: 'Rams',
    city: 'Los Angeles',
    abbreviation: 'LAR',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#003594',
    secondaryColor: '#FFA300',
    logo: '/teams/LAR.png',
    wins: 10, losses: 7, ties: 0
  },
  {
    id: 'gb',
    name: 'Packers',
    city: 'Green Bay',
    abbreviation: 'GB',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#203731',
    secondaryColor: '#FFB612',
    logo: '/teams/GB.png',
    wins: 11, losses: 6, ties: 0
  },

  // Non-playoff teams (for context)
  {
    id: 'sf',
    name: '49ers',
    city: 'San Francisco',
    abbreviation: 'SF',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#AA0000',
    secondaryColor: '#B3995D',
    logo: '/teams/SF.png',
    wins: 6, losses: 11, ties: 0
  },
  {
    id: 'dal',
    name: 'Cowboys',
    city: 'Dallas',
    abbreviation: 'DAL',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#003594',
    secondaryColor: '#869397',
    logo: '/teams/DAL.png',
    wins: 7, losses: 10, ties: 0
  }
];

// Helper function to get team by ID
const getTeam = (id: string) => teams.find(t => t.id === id)!;

// Current NFL Season Star Players (Updated Stats through Week 18)
export const players: Player[] = [
  // MVP Candidates - 2024/25 Season
  {
    id: 'lamar2025',
    name: 'Lamar Jackson',
    position: 'QB',
    number: 8,
    teamId: 'bal',
    passingYards: 3678,
    rushingYards: 915,
    touchdowns: 44
  },
  {
    id: 'allen2025',
    name: 'Josh Allen',
    position: 'QB',
    number: 17,
    teamId: 'buf',
    passingYards: 4306,
    rushingYards: 523,
    touchdowns: 43
  },
  {
    id: 'goff2025',
    name: 'Jared Goff',
    position: 'QB',
    number: 16,
    teamId: 'det',
    passingYards: 4629,
    touchdowns: 37
  },
  {
    id: 'hurts2025',
    name: 'Jalen Hurts',
    position: 'QB',
    number: 1,
    teamId: 'phi',
    passingYards: 3858,
    rushingYards: 630,
    touchdowns: 29
  },
  {
    id: 'mahomes2025',
    name: 'Patrick Mahomes',
    position: 'QB',
    number: 15,
    teamId: 'kc',
    passingYards: 3928,
    touchdowns: 26
  },

  // Running Back Leaders
  {
    id: 'barkley2025',
    name: 'Saquon Barkley',
    position: 'RB',
    number: 26,
    teamId: 'phi',
    rushingYards: 2005,
    receivingYards: 278,
    touchdowns: 15
  },
  {
    id: 'henry2025',
    name: 'Derrick Henry',
    position: 'RB',
    number: 22,
    teamId: 'bal',
    rushingYards: 1921,
    touchdowns: 16
  },
  {
    id: 'gibbs2025',
    name: 'Jahmyr Gibbs',
    position: 'RB',
    number: 26,
    teamId: 'det',
    rushingYards: 1412,
    receivingYards: 516,
    touchdowns: 20
  },

  // Wide Receiver Leaders
  {
    id: 'stbrown2025',
    name: 'Amon-Ra St. Brown',
    position: 'WR',
    number: 14,
    teamId: 'det',
    receivingYards: 1263,
    touchdowns: 12
  },
  {
    id: 'brown2025',
    name: 'A.J. Brown',
    position: 'WR',
    number: 11,
    teamId: 'phi',
    receivingYards: 1079,
    touchdowns: 7
  },
  {
    id: 'flowers2025',
    name: 'Zay Flowers',
    position: 'WR',
    number: 4,
    teamId: 'bal',
    receivingYards: 1059,
    touchdowns: 4
  },

  // Tight Ends
  {
    id: 'kelce2025',
    name: 'Travis Kelce',
    position: 'TE',
    number: 87,
    teamId: 'kc',
    receivingYards: 823,
    touchdowns: 3
  }
];

// DIVISIONAL ROUND GAMES - January 18-19, 2025
export const todaysGames: Game[] = [
  {
    id: 'divisional_afc_1',
    homeTeam: getTeam('kc'),
    awayTeam: getTeam('hou'),
    date: '2025-01-18',
    time: '16:30',
    week: 20, // Divisional Round
    season: 2024,
    status: 'scheduled',
    venue: 'Arrowhead Stadium',
    winProbability: {
      home: 72,
      away: 28
    }
  },
  {
    id: 'divisional_afc_2',
    homeTeam: getTeam('buf'),
    awayTeam: getTeam('bal'),
    date: '2025-01-19',
    time: '13:00',
    week: 20,
    season: 2024,
    status: 'scheduled',
    venue: 'Highmark Stadium',
    winProbability: {
      home: 58,
      away: 42
    }
  },
  {
    id: 'divisional_nfc_1',
    homeTeam: getTeam('det'),
    awayTeam: getTeam('was'),
    date: '2025-01-18',
    time: '20:15',
    week: 20,
    season: 2024,
    status: 'scheduled',
    venue: 'Ford Field',
    winProbability: {
      home: 68,
      away: 32
    }
  },
  {
    id: 'divisional_nfc_2',
    homeTeam: getTeam('phi'),
    awayTeam: getTeam('lar'),
    date: '2025-01-19',
    time: '16:30',
    week: 20,
    season: 2024,
    status: 'scheduled',
    venue: 'Lincoln Financial Field',
    winProbability: {
      home: 61,
      away: 39
    }
  }
];

// Wild Card Weekend Results (Already Completed)
export const recentGames: Game[] = [
  {
    id: 'wildcard_1',
    homeTeam: getTeam('buf'),
    awayTeam: getTeam('den'),
    date: '2025-01-12',
    time: '13:00',
    week: 19,
    season: 2024,
    homeScore: 31,
    awayScore: 7,
    status: 'completed',
    venue: 'Highmark Stadium'
  },
  {
    id: 'wildcard_2',
    homeTeam: getTeam('bal'),
    awayTeam: getTeam('pit'),
    date: '2025-01-11',
    time: '16:30',
    week: 19,
    season: 2024,
    homeScore: 28,
    awayScore: 14,
    status: 'completed',
    venue: 'M&T Bank Stadium'
  },
  {
    id: 'wildcard_3',
    homeTeam: getTeam('phi'),
    awayTeam: getTeam('gb'),
    date: '2025-01-12',
    time: '16:30',
    week: 19,
    season: 2024,
    homeScore: 22,
    awayScore: 10,
    status: 'completed',
    venue: 'Lincoln Financial Field'
  },
  {
    id: 'wildcard_4',
    homeTeam: getTeam('det'),
    awayTeam: getTeam('min'),
    date: '2025-01-13',
    time: '20:15',
    week: 19,
    season: 2024,
    homeScore: 31,
    awayScore: 9,
    status: 'completed',
    venue: 'Ford Field'
  }
];

// DIVISIONAL ROUND PREDICTIONS - January 18-19, 2025
export const predictions: Prediction[] = [
  {
    gameId: 'divisional_afc_1',
    homeWinProbability: 72,
    awayWinProbability: 28,
    predictedScore: {
      home: 27,
      away: 17
    },
    confidence: 84,
    factors: [
      'Kansas City\'s playoff experience at Arrowhead',
      'Mahomes\' elite postseason performance',
      'Houston\'s rookie QB in hostile environment',
      'Chiefs\' defensive improvement in January'
    ]
  },
  {
    gameId: 'divisional_afc_2',
    homeWinProbability: 58,
    awayWinProbability: 42,
    predictedScore: {
      home: 24,
      away: 21
    },
    confidence: 71,
    factors: [
      'Buffalo\'s home field advantage in winter',
      'Lamar Jackson\'s MVP-caliber season',
      'Ravens\' superior rushing attack',
      'Bills\' experience vs mobile QBs'
    ]
  },
  {
    gameId: 'divisional_nfc_1',
    homeWinProbability: 68,
    awayWinProbability: 32,
    predictedScore: {
      home: 28,
      away: 20
    },
    confidence: 78,
    factors: [
      'Detroit\'s #1 seed advantage',
      'Home dome conditions favor Lions offense',
      'Washington\'s inexperienced playoff roster',
      'Lions\' explosive offensive weapons'
    ]
  },
  {
    gameId: 'divisional_nfc_2',
    homeWinProbability: 61,
    awayWinProbability: 39,
    predictedScore: {
      home: 26,
      away: 23
    },
    confidence: 76,
    factors: [
      'Philadelphia\'s strong ground game',
      'Home crowd advantage at Lincoln Financial',
      'Rams\' playoff experience edge',
      'Weather conditions favor Eagles style'
    ]
  }
];

// Upcoming Conference Championships (if predictions hold)
export const upcomingGames: Game[] = [
  {
    id: 'afc_championship',
    homeTeam: getTeam('kc'), // Assuming KC beats Houston
    awayTeam: getTeam('buf'), // Assuming Buffalo beats Baltimore
    date: '2025-01-26',
    time: '15:00',
    week: 21,
    season: 2024,
    status: 'scheduled',
    venue: 'Arrowhead Stadium'
  },
  {
    id: 'nfc_championship',
    homeTeam: getTeam('det'), // Assuming Detroit beats Washington
    awayTeam: getTeam('phi'), // Assuming Philadelphia beats LA Rams
    date: '2025-01-26',
    time: '18:30',
    week: 21,
    season: 2024,
    status: 'scheduled',
    venue: 'Ford Field'
  }
];

// Super Bowl LIX - February 9, 2025 in New Orleans
export const superBowl: Game = {
  id: 'super_bowl_lix',
  homeTeam: getTeam('det'), // Projected NFC Champion
  awayTeam: getTeam('kc'), // Projected AFC Champion
  date: '2025-02-09',
  time: '18:30',
  week: 22,
  season: 2024,
  status: 'scheduled',
  venue: 'Caesars Superdome, New Orleans'
};