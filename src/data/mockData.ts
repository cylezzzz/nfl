import { Team, Player, Game, Prediction } from '../types';

// NFL Saison 2024/25 - Aktuelle Playoff-Standings (Januar 2025)
export const teams: Team[] = [
  // --- AFC East ---
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
    id: 'mia',
    name: 'Dolphins',
    city: 'Miami',
    abbreviation: 'MIA',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#008E97',
    secondaryColor: '#FC4C02',
    logo: '/teams/MIA.png',
    wins: 8, losses: 9, ties: 0
  },
  {
    id: 'ne',
    name: 'Patriots',
    city: 'New England',
    abbreviation: 'NE',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#002244',
    secondaryColor: '#C60C30',
    logo: '/teams/NE.png',
    wins: 4, losses: 13, ties: 0
  },
  {
    id: 'nyj',
    name: 'Jets',
    city: 'New York',
    abbreviation: 'NYJ',
    division: 'AFC East',
    conference: 'AFC',
    primaryColor: '#125740',
    secondaryColor: '#000000',
    logo: '/teams/NYJ.png',
    wins: 5, losses: 12, ties: 0
  },

  // --- AFC North ---
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
    id: 'cin',
    name: 'Bengals',
    city: 'Cincinnati',
    abbreviation: 'CIN',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#FB4F14',
    secondaryColor: '#000000',
    logo: '/teams/CIN.png',
    wins: 9, losses: 8, ties: 0
  },
  {
    id: 'cle',
    name: 'Browns',
    city: 'Cleveland',
    abbreviation: 'CLE',
    division: 'AFC North',
    conference: 'AFC',
    primaryColor: '#311D00',
    secondaryColor: '#FF3C00',
    logo: '/teams/CLE.png',
    wins: 3, losses: 14, ties: 0
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

  // --- AFC South ---
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
    id: 'ind',
    name: 'Colts',
    city: 'Indianapolis',
    abbreviation: 'IND',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#002C5F',
    secondaryColor: '#A2AAAD',
    logo: '/teams/IND.png',
    wins: 8, losses: 9, ties: 0
  },
  {
    id: 'jax',
    name: 'Jaguars',
    city: 'Jacksonville',
    abbreviation: 'JAX',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#006778',
    secondaryColor: '#D7A22A',
    logo: '/teams/JAX.png',
    wins: 4, losses: 13, ties: 0
  },
  {
    id: 'ten',
    name: 'Titans',
    city: 'Tennessee',
    abbreviation: 'TEN',
    division: 'AFC South',
    conference: 'AFC',
    primaryColor: '#4B92DB',
    secondaryColor: '#002244',
    logo: '/teams/TEN.png',
    wins: 3, losses: 14, ties: 0
  },

  // --- AFC West ---
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
    id: 'lv',
    name: 'Raiders',
    city: 'Las Vegas',
    abbreviation: 'LV',
    division: 'AFC West',
    conference: 'AFC',
    primaryColor: '#000000',
    secondaryColor: '#A5ACAF',
    logo: '/teams/LV.png',
    wins: 4, losses: 13, ties: 0
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

  // --- NFC East ---
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
  },
  {
    id: 'nyg',
    name: 'Giants',
    city: 'New York',
    abbreviation: 'NYG',
    division: 'NFC East',
    conference: 'NFC',
    primaryColor: '#0B2265',
    secondaryColor: '#A71930',
    logo: '/teams/NYG.png',
    wins: 3, losses: 14, ties: 0
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

  // --- NFC North ---
  {
    id: 'chi',
    name: 'Bears',
    city: 'Chicago',
    abbreviation: 'CHI',
    division: 'NFC North',
    conference: 'NFC',
    primaryColor: '#0B162A',
    secondaryColor: '#C83803',
    logo: '/teams/CHI.png',
    wins: 5, losses: 12, ties: 0
  },
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

  // --- NFC South ---
  {
    id: 'atl',
    name: 'Falcons',
    city: 'Atlanta',
    abbreviation: 'ATL',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#A71930',
    secondaryColor: '#000000',
    logo: '/teams/ATL.png',
    wins: 8, losses: 9, ties: 0
  },
  {
    id: 'car',
    name: 'Panthers',
    city: 'Carolina',
    abbreviation: 'CAR',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#0085CA',
    secondaryColor: '#101820',
    logo: '/teams/CAR.png',
    wins: 5, losses: 12, ties: 0
  },
  {
    id: 'no',
    name: 'Saints',
    city: 'New Orleans',
    abbreviation: 'NO',
    division: 'NFC South',
    conference: 'NFC',
    primaryColor: '#D3BC8D',
    secondaryColor: '#101820',
    logo: '/teams/NO.png',
    wins: 5, losses: 12, ties: 0
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

  // --- NFC West ---
  {
    id: 'ari',
    name: 'Cardinals',
    city: 'Arizona',
    abbreviation: 'ARI',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#97233F',
    secondaryColor: '#000000',
    logo: '/teams/ARI.png',
    wins: 8, losses: 9, ties: 0
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
    id: 'sea',
    name: 'Seahawks',
    city: 'Seattle',
    abbreviation: 'SEA',
    division: 'NFC West',
    conference: 'NFC',
    primaryColor: '#002244',
    secondaryColor: '#69BE28',
    logo: '/teams/SEA.png',
    wins: 10, losses: 7, ties: 0
  }
];

// Helper function to get team by ID
const getTeam = (id: string) => teams.find(t => t.id === id)!;

// NFL Saison 2024/25 Star Players
export const players: Player[] = [
  // Quarterbacks - 2024/25 Season Leaders
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
    id: 'jackson2025',
    name: 'Lamar Jackson',
    position: 'QB',
    number: 8,
    teamId: 'bal',
    passingYards: 3678,
    rushingYards: 915,
    touchdowns: 44
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
    id: 'mahomes2025',
    name: 'Patrick Mahomes',
    position: 'QB',
    number: 15,
    teamId: 'kc',
    passingYards: 3928,
    touchdowns: 26
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
    id: 'daniels2025',
    name: 'Jayden Daniels',
    position: 'QB',
    number: 5,
    teamId: 'was',
    passingYards: 3568,
    rushingYards: 891,
    touchdowns: 31
  },
  {
    id: 'darnold2025',
    name: 'Sam Darnold',
    position: 'QB',
    number: 14,
    teamId: 'min',
    passingYards: 4319,
    touchdowns: 35
  },

  // Running Backs - 2024/25 Season
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
  {
    id: 'robinson2025',
    name: 'Brian Robinson Jr.',
    position: 'RB',
    number: 8,
    teamId: 'was',
    rushingYards: 1343,
    touchdowns: 8
  },
  {
    id: 'mixon2025',
    name: 'Joe Mixon',
    position: 'RB',
    number: 28,
    teamId: 'hou',
    rushingYards: 1426,
    touchdowns: 11
  },

  // Wide Receivers - 2024/25 Season
  {
    id: 'chase2025',
    name: 'Ja\'Marr Chase',
    position: 'WR',
    number: 1,
    teamId: 'cin',
    receivingYards: 1708,
    touchdowns: 16
  },
  {
    id: 'jefferson2025',
    name: 'Justin Jefferson',
    position: 'WR',
    number: 18,
    teamId: 'min',
    receivingYards: 1533,
    touchdowns: 10
  },
  {
    id: 'stgermain2025',
    name: 'Amon-Ra St. Brown',
    position: 'WR',
    number: 14,
    teamId: 'det',
    receivingYards: 1263,
    touchdowns: 12
  },
  {
    id: 'adams2025',
    name: 'Davante Adams',
    position: 'WR',
    number: 17,
    teamId: 'nyj',
    receivingYards: 1243,
    touchdowns: 8
  },
  {
    id: 'mclaurin2025',
    name: 'Terry McLaurin',
    position: 'WR',
    number: 17,
    teamId: 'was',
    receivingYards: 1096,
    touchdowns: 13
  },
  {
    id: 'hopkins2025',
    name: 'DeAndre Hopkins',
    position: 'WR',
    number: 10,
    teamId: 'kc',
    receivingYards: 1057,
    touchdowns: 8
  },

  // Tight Ends
  {
    id: 'laporta2025',
    name: 'Sam LaPorta',
    position: 'TE',
    number: 87,
    teamId: 'det',
    receivingYards: 889,
    touchdowns: 9
  },
  {
    id: 'kelce2025',
    name: 'Travis Kelce',
    position: 'TE',
    number: 87,
    teamId: 'kc',
    receivingYards: 823,
    touchdowns: 3
  },

  // Defensive Players
  {
    id: 'watt2025',
    name: 'T.J. Watt',
    position: 'LB',
    number: 90,
    teamId: 'pit',
    tackles: 84,
    touchdowns: 1
  },
  {
    id: 'parsons2025',
    name: 'Micah Parsons',
    position: 'LB',
    number: 11,
    teamId: 'dal',
    tackles: 103,
    touchdowns: 0
  }
];

// Aktuelle NFL Playoff-Spiele (Januar 2025)
export const todaysGames: Game[] = [
  {
    id: 'afc_divisional_1',
    homeTeam: getTeam('kc'),
    awayTeam: getTeam('hou'),
    date: '2025-01-18',
    time: '16:30',
    week: 19, // Divisional Round
    season: 2024,
    status: 'scheduled',
    venue: 'Arrowhead Stadium',
    winProbability: {
      home: 78,
      away: 22
    }
  },
  {
    id: 'afc_divisional_2',
    homeTeam: getTeam('buf'),
    awayTeam: getTeam('bal'),
    date: '2025-01-19',
    time: '18:30',
    week: 19,
    season: 2024,
    status: 'scheduled',
    venue: 'Highmark Stadium',
    winProbability: {
      home: 65,
      away: 35
    }
  },
  {
    id: 'nfc_divisional_1',
    homeTeam: getTeam('det'),
    awayTeam: getTeam('was'),
    date: '2025-01-18',
    time: '20:15',
    week: 19,
    season: 2024,
    status: 'scheduled',
    venue: 'Ford Field',
    winProbability: {
      home: 58,
      away: 42
    }
  },
  {
    id: 'nfc_divisional_2',
    homeTeam: getTeam('phi'),
    awayTeam: getTeam('lar'),
    date: '2025-01-19',
    time: '15:00',
    week: 19,
    season: 2024,
    status: 'scheduled',
    venue: 'Lincoln Financial Field',
    winProbability: {
      home: 71,
      away: 29
    }
  }
];

// Wild Card Results (vergangene Woche)
export const recentGames: Game[] = [
  {
    id: 'wildcard_1',
    homeTeam: getTeam('lac'),
    awayTeam: getTeam('hou'),
    date: '2025-01-11',
    time: '16:30',
    week: 18,
    season: 2024,
    homeScore: 12,
    awayScore: 32,
    status: 'completed',
    venue: 'SoFi Stadium'
  },
  {
    id: 'wildcard_2',
    homeTeam: getTeam('pit'),
    awayTeam: getTeam('bal'),
    date: '2025-01-11',
    time: '20:15',
    week: 18,
    season: 2024,
    homeScore: 14,
    awayScore: 28,
    status: 'completed',
    venue: 'Acrisure Stadium'
  },
  {
    id: 'wildcard_3',
    homeTeam: getTeam('tb'),
    awayTeam: getTeam('was'),
    date: '2025-01-12',
    time: '20:15',
    week: 18,
    season: 2024,
    homeScore: 20,
    awayScore: 23,
    status: 'completed',
    venue: 'Raymond James Stadium'
  },
  {
    id: 'wildcard_4',
    homeTeam: getTeam('min'),
    awayTeam: getTeam('lar'),
    date: '2025-01-13',
    time: '20:15',
    week: 18,
    season: 2024,
    homeScore: 9,
    awayScore: 27,
    status: 'completed',
    venue: 'U.S. Bank Stadium'
  },
  {
    id: 'wildcard_5',
    homeTeam: getTeam('den'),
    awayTeam: getTeam('buf'),
    date: '2025-01-12',
    time: '13:00',
    week: 18,
    season: 2024,
    homeScore: 7,
    awayScore: 31,
    status: 'completed',
    venue: 'Empower Field at Mile High'
  },
  {
    id: 'wildcard_6',
    homeTeam: getTeam('gb'),
    awayTeam: getTeam('phi'),
    date: '2025-01-12',
    time: '16:30',
    week: 18,
    season: 2024,
    homeScore: 10,
    awayScore: 22,
    status: 'completed',
    venue: 'Lambeau Field'
  }
];

// KI-Vorhersagen für aktuelle Playoff-Spiele
export const predictions: Prediction[] = [
  {
    gameId: 'afc_divisional_1',
    homeWinProbability: 78,
    awayWinProbability: 22,
    predictedScore: {
      home: 31,
      away: 17
    },
    confidence: 89,
    factors: [
      'Kansas City\'s playoff experience advantage',
      'Houston\'s road struggles in cold weather',
      'Mahomes vs rookie playoff QB matchup',
      'Home field advantage at Arrowhead'
    ]
  },
  {
    gameId: 'afc_divisional_2',
    homeWinProbability: 65,
    awayWinProbability: 35,
    predictedScore: {
      home: 27,
      away: 21
    },
    confidence: 74,
    factors: [
      'Buffalo\'s home field advantage in January',
      'Josh Allen\'s mobility vs Ravens defense',
      'Baltimore\'s playoff experience',
      'Weather conditions favor ground game'
    ]
  },
  {
    gameId: 'nfc_divisional_1',
    homeWinProbability: 58,
    awayWinProbability: 42,
    predictedScore: {
      home: 28,
      away: 24
    },
    confidence: 67,
    factors: [
      'Detroit\'s explosive offensive weapons',
      'Washington\'s rookie QB playoff inexperience',
      'Lions\' dome advantage',
      'Defensive matchup heavily favors Detroit'
    ]
  },
  {
    gameId: 'nfc_divisional_2',
    homeWinProbability: 71,
    awayWinProbability: 29,
    predictedScore: {
      home: 30,
      away: 20
    },
    confidence: 82,
    factors: [
      'Philadelphia\'s dominant rushing attack',
      'Saquon Barkley\'s playoff motivation',
      'Eagles\' superior depth and talent',
      'Home field advantage in cold weather'
    ]
  }
];