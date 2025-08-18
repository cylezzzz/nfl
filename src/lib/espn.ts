// src/lib/espn.ts - Updated for 2025/26 Season
export function currentNflSeasonYear(date = new Date()): number {
  // NFL: regulär Sep–Feb -> Year, Jan/Feb zählen noch fürs Vorjahr
  // Für 2025/26 Season: Sep 2025 - Feb 2026
  const y = date.getFullYear();
  const m = date.getMonth(); // 0..11
  
  // Wenn wir in 2025 sind und es September oder später ist -> 2025 Season
  // Wenn wir in 2026 sind und es vor März ist -> 2025 Season
  if (y === 2025 && m >= 8) return 2025; // Sep-Dec 2025
  if (y === 2026 && m < 3) return 2025;  // Jan-Feb 2026
  
  // Für 2026/27 Season: Sep 2026 - Feb 2027
  if (y === 2026 && m >= 8) return 2026; // Sep-Dec 2026
  if (y === 2027 && m < 3) return 2026;  // Jan-Feb 2027
  
  // Standard logic für andere Jahre
  return m >= 8 ? y : y - 1;
}

function getFallbackTeams(): TeamBasic[] {
  // Fallback für alle 32 NFL Teams mit frühen 2025/26 Season Records (nach Week 3)
  return [
    { id: '1', abbr: 'ARI', city: 'Arizona', name: 'Cardinals', display: 'Arizona Cardinals', logo: '/teams/ARI.png', record: '2-1', division: 'NFC West', conference: 'NFC' },
    { id: '2', abbr: 'ATL', city: 'Atlanta', name: 'Falcons', display: 'Atlanta Falcons', logo: '/teams/ATL.png', record: '3-0', division: 'NFC South', conference: 'NFC' },
    { id: '3', abbr: 'BAL', city: 'Baltimore', name: 'Ravens', display: 'Baltimore Ravens', logo: '/teams/BAL.png', record: '2-1', division: 'AFC North', conference: 'AFC' },
    { id: '4', abbr: 'BUF', city: 'Buffalo', name: 'Bills', display: 'Buffalo Bills', logo: '/teams/BUF.png', record: '3-0', division: 'AFC East', conference: 'AFC' },
    { id: '5', abbr: 'CAR', city: 'Carolina', name: 'Panthers', display: 'Carolina Panthers', logo: '/teams/CAR.png', record: '1-2', division: 'NFC South', conference: 'NFC' },
    { id: '6', abbr: 'CHI', city: 'Chicago', name: 'Bears', display: 'Chicago Bears', logo: '/teams/CHI.png', record: '2-1', division: 'NFC North', conference: 'NFC' },
    { id: '7', abbr: 'CIN', city: 'Cincinnati', name: 'Bengals', display: 'Cincinnati Bengals', logo: '/teams/CIN.png', record: '2-1', division: 'AFC North', conference: 'AFC' },
    { id: '8', abbr: 'CLE', city: 'Cleveland', name: 'Browns', display: 'Cleveland Browns', logo: '/teams/CLE.png', record: '1-2', division: 'AFC North', conference: 'AFC' },
    { id: '9', abbr: 'DAL', city: 'Dallas', name: 'Cowboys', display: 'Dallas Cowboys', logo: '/teams/DAL.png', record: '1-2', division: 'NFC East', conference: 'NFC' },
    { id: '10', abbr: 'DEN', city: 'Denver', name: 'Broncos', display: 'Denver Broncos', logo: '/teams/DEN.png', record: '3-0', division: 'AFC West', conference: 'AFC' },
    { id: '11', abbr: 'DET', city: 'Detroit', name: 'Lions', display: 'Detroit Lions', logo: '/teams/DET.png', record: '2-1', division: 'NFC North', conference: 'NFC' },
    { id: '12', abbr: 'GB', city: 'Green Bay', name: 'Packers', display: 'Green Bay Packers', logo: '/teams/GB.png', record: '2-1', division: 'NFC North', conference: 'NFC' },
    { id: '13', abbr: 'HOU', city: 'Houston', name: 'Texans', display: 'Houston Texans', logo: '/teams/HOU.png', record: '2-1', division: 'AFC South', conference: 'AFC' },
    { id: '14', abbr: 'IND', city: 'Indianapolis', name: 'Colts', display: 'Indianapolis Colts', logo: '/teams/IND.png', record: '1-2', division: 'AFC South', conference: 'AFC' },
    { id: '15', abbr: 'JAX', city: 'Jacksonville', name: 'Jaguars', display: 'Jacksonville Jaguars', logo: '/teams/JAX.png', record: '0-3', division: 'AFC South', conference: 'AFC' },
    { id: '16', abbr: 'KC', city: 'Kansas City', name: 'Chiefs', display: 'Kansas City Chiefs', logo: '/teams/KC.png', record: '3-0', division: 'AFC West', conference: 'AFC' },
    { id: '17', abbr: 'LV', city: 'Las Vegas', name: 'Raiders', display: 'Las Vegas Raiders', logo: '/teams/LV.png', record: '1-2', division: 'AFC West', conference: 'AFC' },
    { id: '18', abbr: 'LAC', city: 'Los Angeles', name: 'Chargers', display: 'Los Angeles Chargers', logo: '/teams/LAC.png', record: '2-1', division: 'AFC West', conference: 'AFC' },
    { id: '19', abbr: 'LAR', city: 'Los Angeles', name: 'Rams', display: 'Los Angeles Rams', logo: '/teams/LAR.png', record: '1-2', division: 'NFC West', conference: 'NFC' },
    { id: '20', abbr: 'MIA', city: 'Miami', name: 'Dolphins', display: 'Miami Dolphins', logo: '/teams/MIA.png', record: '1-2', division: 'AFC East', conference: 'AFC' },
    { id: '21', abbr: 'MIN', city: 'Minnesota', name: 'Vikings', display: 'Minnesota Vikings', logo: '/teams/MIN.png', record: '3-0', division: 'NFC North', conference: 'NFC' },
    { id: '22', abbr: 'NE', city: 'New England', name: 'Patriots', display: 'New England Patriots', logo: '/teams/NE.png', record: '1-2', division: 'AFC East', conference: 'AFC' },
    { id: '23', abbr: 'NO', city: 'New Orleans', name: 'Saints', display: 'New Orleans Saints', logo: '/teams/NO.png', record: '2-1', division: 'NFC South', conference: 'NFC' },
    { id: '24', abbr: 'NYG', city: 'New York', name: 'Giants', display: 'New York Giants', logo: '/teams/NYG.png', record: '1-2', division: 'NFC East', conference: 'NFC' },
    { id: '25', abbr: 'NYJ', city: 'New York', name: 'Jets', display: 'New York Jets', logo: '/teams/NYJ.png', record: '2-1', division: 'AFC East', conference: 'AFC' },
    { id: '26', abbr: 'PHI', city: 'Philadelphia', name: 'Eagles', display: 'Philadelphia Eagles', logo: '/teams/PHI.png', record: '2-1', division: 'NFC East', conference: 'NFC' },
    { id: '27', abbr: 'PIT', city: 'Pittsburgh', name: 'Steelers', display: 'Pittsburgh Steelers', logo: '/teams/PIT.png', record: '3-0', division: 'AFC North', conference: 'AFC' },
    { id: '28', abbr: 'SF', city: 'San Francisco', name: '49ers', display: 'San Francisco 49ers', logo: '/teams/SF.png', record: '1-2', division: 'NFC West', conference: 'NFC' },
    { id: '29', abbr: 'SEA', city: 'Seattle', name: 'Seahawks', display: 'Seattle Seahawks', logo: '/teams/SEA.png', record: '3-0', division: 'NFC West', conference: 'NFC' },
    { id: '30', abbr: 'TB', city: 'Tampa Bay', name: 'Buccaneers', display: 'Tampa Bay Buccaneers', logo: '/teams/TB.png', record: '2-1', division: 'NFC South', conference: 'NFC' },
    { id: '31', abbr: 'TEN', city: 'Tennessee', name: 'Titans', display: 'Tennessee Titans', logo: '/teams/TEN.png', record: '0-3', division: 'AFC South', conference: 'AFC' },
    { id: '32', abbr: 'WAS', city: 'Washington', name: 'Commanders', display: 'Washington Commanders', logo: '/teams/WAS.png', record: '2-1', division: 'NFC East', conference: 'NFC' }
  ];
}