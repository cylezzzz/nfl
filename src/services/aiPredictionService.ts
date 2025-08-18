// src/services/aiPredictionService.ts
import { Game, Prediction, Team } from '../types';

interface TeamStats {
  offensiveRating: number;
  defensiveRating: number;
  homeAdvantage: number;
  recentForm: number;
  turnoverDifferential: number;
  injuryImpact: number;
}

interface GameFactors {
  weather: number;
  restDays: number;
  rivalry: boolean;
  playoffs: boolean;
  primetime: boolean;
  travel: number;
}

class AIPredictionService {
  private teamStats: Map<string, TeamStats> = new Map();

  constructor() {
    this.initializeTeamStats();
  }

  private initializeTeamStats() {
    // Simulierte Team-Statistiken basierend auf aktueller NFL Saison
    const statsData: Record<string, TeamStats> = {
      'kc': { offensiveRating: 95, defensiveRating: 78, homeAdvantage: 85, recentForm: 92, turnoverDifferential: 8, injuryImpact: -2 },
      'buf': { offensiveRating: 88, defensiveRating: 82, homeAdvantage: 72, recentForm: 85, turnoverDifferential: 5, injuryImpact: -5 },
      'phi': { offensiveRating: 91, defensiveRating: 75, homeAdvantage: 78, recentForm: 88, turnoverDifferential: 12, injuryImpact: -1 },
      'sf': { offensiveRating: 89, defensiveRating: 85, homeAdvantage: 74, recentForm: 82, turnoverDifferential: 7, injuryImpact: -8 },
      'bal': { offensiveRating: 93, defensiveRating: 73, homeAdvantage: 76, recentForm: 90, turnoverDifferential: 15, injuryImpact: -3 },
      'det': { offensiveRating: 94, defensiveRating: 68, homeAdvantage: 81, recentForm: 89, turnoverDifferential: 9, injuryImpact: -1 },
      'dal': { offensiveRating: 85, defensiveRating: 71, homeAdvantage: 79, recentForm: 78, turnoverDifferential: 2, injuryImpact: -4 },
      'mia': { offensiveRating: 82, defensiveRating: 77, homeAdvantage: 69, recentForm: 75, turnoverDifferential: -3, injuryImpact: -6 },
      'cle': { offensiveRating: 79, defensiveRating: 83, homeAdvantage: 73, recentForm: 81, turnoverDifferential: 1, injuryImpact: -7 },
      'hou': { offensiveRating: 86, defensiveRating: 74, homeAdvantage: 71, recentForm: 83, turnoverDifferential: 6, injuryImpact: -2 },
      'lac': { offensiveRating: 87, defensiveRating: 69, homeAdvantage: 68, recentForm: 79, turnoverDifferential: 4, injuryImpact: -5 },
      'pit': { offensiveRating: 81, defensiveRating: 86, homeAdvantage: 82, recentForm: 77, turnoverDifferential: 3, injuryImpact: -3 },
      'gb': { offensiveRating: 84, defensiveRating: 72, homeAdvantage: 83, recentForm: 76, turnoverDifferential: -1, injuryImpact: -4 },
      'min': { offensiveRating: 83, defensiveRating: 70, homeAdvantage: 75, recentForm: 74, turnoverDifferential: -2, injuryImpact: -6 },
      'lar': { offensiveRating: 88, defensiveRating: 67, homeAdvantage: 70, recentForm: 80, turnoverDifferential: 0, injuryImpact: -5 },
      'tb': { offensiveRating: 80, defensiveRating: 76, homeAdvantage: 77, recentForm: 73, turnoverDifferential: -4, injuryImpact: -3 },
      'no': { offensiveRating: 78, defensiveRating: 79, homeAdvantage: 80, recentForm: 72, turnoverDifferential: -5, injuryImpact: -8 },
      'ind': { offensiveRating: 76, defensiveRating: 74, homeAdvantage: 72, recentForm: 71, turnoverDifferential: -6, injuryImpact: -4 },
      'sea': { offensiveRating: 77, defensiveRating: 73, homeAdvantage: 84, recentForm: 69, turnoverDifferential: -3, injuryImpact: -5 },
      'den': { offensiveRating: 75, defensiveRating: 81, homeAdvantage: 78, recentForm: 68, turnoverDifferential: 2, injuryImpact: -2 },
      'atl': { offensiveRating: 74, defensiveRating: 68, homeAdvantage: 69, recentForm: 67, turnoverDifferential: -8, injuryImpact: -6 },
      'cin': { offensiveRating: 90, defensiveRating: 64, homeAdvantage: 67, recentForm: 66, turnoverDifferential: -2, injuryImpact: -9 },
      'nyj': { offensiveRating: 72, defensiveRating: 78, homeAdvantage: 68, recentForm: 65, turnoverDifferential: -7, injuryImpact: -10 },
      'chi': { offensiveRating: 71, defensiveRating: 75, homeAdvantage: 74, recentForm: 64, turnoverDifferential: -9, injuryImpact: -5 },
      'was': { offensiveRating: 73, defensiveRating: 66, homeAdvantage: 71, recentForm: 63, turnoverDifferential: -11, injuryImpact: -7 },
      'nyg': { offensiveRating: 69, defensiveRating: 71, homeAdvantage: 73, recentForm: 62, turnoverDifferential: -12, injuryImpact: -8 },
      'ten': { offensiveRating: 68, defensiveRating: 69, homeAdvantage: 70, recentForm: 61, turnoverDifferential: -14, injuryImpact: -9 },
      'ari': { offensiveRating: 70, defensiveRating: 65, homeAdvantage: 66, recentForm: 60, turnoverDifferential: -13, injuryImpact: -6 },
      'ne': { offensiveRating: 67, defensiveRating: 70, homeAdvantage: 75, recentForm: 59, turnoverDifferential: -15, injuryImpact: -7 },
      'lv': { offensiveRating: 66, defensiveRating: 63, homeAdvantage: 65, recentForm: 58, turnoverDifferential: -16, injuryImpact: -10 },
      'car': { offensiveRating: 64, defensiveRating: 62, homeAdvantage: 64, recentForm: 57, turnoverDifferential: -18, injuryImpact: -11 },
      'jax': { offensiveRating: 63, defensiveRating: 61, homeAdvantage: 63, recentForm: 56, turnoverDifferential: -20, injuryImpact: -12 }
    };

    Object.entries(statsData).forEach(([teamId, stats]) => {
      this.teamStats.set(teamId, stats);
    });
  }

  async generatePrediction(game: Game): Promise<Prediction> {
    const homeStats = this.teamStats.get(game.homeTeam.id) || this.getDefaultStats();
    const awayStats = this.teamStats.get(game.awayTeam.id) || this.getDefaultStats();
    
    const gameFactors = this.analyzeGameFactors(game);
    
    // Berechne Team-Stärken
    const homeStrength = this.calculateTeamStrength(homeStats, true, gameFactors);
    const awayStrength = this.calculateTeamStrength(awayStats, false, gameFactors);
    
    // Berechne Win-Wahrscheinlichkeiten
    const totalStrength = homeStrength + awayStrength;
    const homeWinProbability = Math.round((homeStrength / totalStrength) * 100);
    const awayWinProbability = 100 - homeWinProbability;
    
    // Berechne vorhergesagte Scores
    const { homeScore, awayScore } = this.predictScores(homeStats, awayStats, gameFactors);
    
    // Berechne Konfidenz
    const confidence = this.calculateConfidence(homeStats, awayStats, gameFactors);
    
    // Generiere Faktoren
    const factors = this.generateFactors(game, homeStats, awayStats, gameFactors);

    return {
      gameId: game.id,
      homeWinProbability,
      awayWinProbability,
      predictedScore: {
        home: homeScore,
        away: awayScore
      },
      confidence,
      factors
    };
  }

  private getDefaultStats(): TeamStats {
    return {
      offensiveRating: 75,
      defensiveRating: 75,
      homeAdvantage: 70,
      recentForm: 70,
      turnoverDifferential: 0,
      injuryImpact: -5
    };
  }

  private analyzeGameFactors(game: Game): GameFactors {
    const isPlayoffs = game.week > 18;
    const isPrimetime = ['19:00', '20:00', '20:15', '20:30'].some(time => game.time.startsWith(time.slice(0, 2)));
    const isRivalry = this.isRivalryGame(game.homeTeam.id, game.awayTeam.id);
    
    return {
      weather: Math.random() * 20 - 10, // -10 bis +10 Punkte
      restDays: Math.floor(Math.random() * 7) + 4, // 4-10 Tage
      rivalry: isRivalry,
      playoffs: isPlayoffs,
      primetime: isPrimetime,
      travel: Math.random() * 1000 + 500 // 500-1500 Meilen
    };
  }

  private isRivalryGame(homeTeamId: string, awayTeamId: string): boolean {
    const rivalries = [
      ['kc', 'den'], ['kc', 'lv'], ['kc', 'lac'],
      ['buf', 'mia'], ['buf', 'ne'], ['buf', 'nyj'],
      ['dal', 'nyg'], ['dal', 'phi'], ['dal', 'was'],
      ['gb', 'chi'], ['gb', 'det'], ['gb', 'min'],
      ['pit', 'bal'], ['pit', 'cle'], ['pit', 'cin'],
      ['sf', 'sea'], ['sf', 'lar'], ['sf', 'ari']
    ];
    
    return rivalries.some(rivalry => 
      (rivalry[0] === homeTeamId && rivalry[1] === awayTeamId) ||
      (rivalry[1] === homeTeamId && rivalry[0] === awayTeamId)
    );
  }

  private calculateTeamStrength(stats: TeamStats, isHome: boolean, factors: GameFactors): number {
    let strength = (stats.offensiveRating + stats.defensiveRating) / 2;
    
    // Home field advantage
    if (isHome) {
      strength += stats.homeAdvantage * 0.3;
    }
    
    // Recent form
    strength += stats.recentForm * 0.2;
    
    // Turnover differential
    strength += stats.turnoverDifferential * 0.5;
    
    // Injury impact
    strength += stats.injuryImpact;
    
    // Weather impact (defensiv orientierte Teams profitieren von schlechtem Wetter)
    if (factors.weather < 0 && stats.defensiveRating > stats.offensiveRating) {
      strength += Math.abs(factors.weather) * 0.2;
    }
    
    // Playoff bonus
    if (factors.playoffs) {
      strength += stats.recentForm * 0.1;
    }
    
    // Rivalry factor
    if (factors.rivalry) {
      strength += 3; // Rivalitätsspiele sind unberechenbarer
    }
    
    return Math.max(strength, 30); // Minimum strength
  }

  private predictScores(homeStats: TeamStats, awayStats: TeamStats, factors: GameFactors): { homeScore: number, awayScore: number } {
    // Basis-Score basierend auf offensive/defensive Ratings
    let homeScore = 20 + (homeStats.offensiveRating - awayStats.defensiveRating) * 0.15;
    let awayScore = 20 + (awayStats.offensiveRating - homeStats.defensiveRating) * 0.15;
    
    // Home field advantage
    homeScore += 2.5;
    
    // Weather impact
    if (factors.weather < -5) {
      homeScore -= 3;
      awayScore -= 3;
    }
    
    // Playoff factor (niedrigere Scores)
    if (factors.playoffs) {
      homeScore -= 2;
      awayScore -= 2;
    }
    
    // Turnover impact
    homeScore += homeStats.turnoverDifferential * 0.3;
    awayScore += awayStats.turnoverDifferential * 0.3;
    
    // Zufallsfaktor
    homeScore += (Math.random() - 0.5) * 8;
    awayScore += (Math.random() - 0.5) * 8;
    
    return {
      homeScore: Math.max(Math.round(homeScore), 10),
      awayScore: Math.max(Math.round(awayScore), 10)
    };
  }

  private calculateConfidence(homeStats: TeamStats, awayStats: TeamStats, factors: GameFactors): number {
    // Grundkonfidenz basierend auf Unterschied der Team-Stärken
    const strengthDiff = Math.abs(
      (homeStats.offensiveRating + homeStats.defensiveRating) - 
      (awayStats.offensiveRating + awayStats.defensiveRating)
    );
    
    let confidence = 50 + strengthDiff * 0.8;
    
    // Reduziere Konfidenz bei Rivalitätsspielen
    if (factors.rivalry) {
      confidence -= 10;
    }
    
    // Reduziere Konfidenz bei Playoffs
    if (factors.playoffs) {
      confidence -= 5;
    }
    
    // Wetter-Unsicherheit
    if (Math.abs(factors.weather) > 5) {
      confidence -= 8;
    }
    
    return Math.max(Math.min(Math.round(confidence), 95), 55);
  }

  private generateFactors(game: Game, homeStats: TeamStats, awayStats: TeamStats, factors: GameFactors): string[] {
    const factorList: string[] = [];
    
    // Home field advantage
    if (homeStats.homeAdvantage > 75) {
      factorList.push(`${game.homeTeam.city}'s strong home field advantage`);
    }
    
    // Recent form
    if (homeStats.recentForm > awayStats.recentForm + 10) {
      factorList.push(`${game.homeTeam.city}'s superior recent form`);
    } else if (awayStats.recentForm > homeStats.recentForm + 10) {
      factorList.push(`${game.awayTeam.city}'s momentum advantage`);
    }
    
    // Turnover differential
    if (homeStats.turnoverDifferential > awayStats.turnoverDifferential + 5) {
      factorList.push(`${game.homeTeam.city}'s ball security advantage`);
    } else if (awayStats.turnoverDifferential > homeStats.turnoverDifferential + 5) {
      factorList.push(`${game.awayTeam.city}'s turnover advantage`);
    }
    
    // Weather
    if (factors.weather < -5) {
      factorList.push('Poor weather conditions favor ground game');
    } else if (factors.weather > 5) {
      factorList.push('Good weather conditions favor passing offense');
    }
    
    // Playoffs
    if (factors.playoffs) {
      factorList.push('Playoff experience and pressure factor');
    }
    
    // Injuries
    if (homeStats.injuryImpact < -5) {
      factorList.push(`${game.homeTeam.city} dealing with key injuries`);
    }
    if (awayStats.injuryImpact < -5) {
      factorList.push(`${game.awayTeam.city} missing important players`);
    }
    
    // Rivalry
    if (factors.rivalry) {
      factorList.push('Divisional rivalry adds unpredictability');
    }
    
    // Defensive strength
    if (homeStats.defensiveRating > 80 && awayStats.offensiveRating < 75) {
      factorList.push(`${game.homeTeam.city}'s defense vs struggling offense`);
    }
    
    return factorList.slice(0, 4); // Maximal 4 Faktoren
  }

  async batchGeneratePredictions(games: Game[]): Promise<Prediction[]> {
    const predictions: Prediction[] = [];
    
    for (const game of games) {
      try {
        const prediction = await this.generatePrediction(game);
        predictions.push(prediction);
        
        // Kleine Pause zwischen Vorhersagen für realistische Performance
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (error) {
        console.error(`Error generating prediction for game ${game.id}:`, error);
      }
    }
    
    return predictions;
  }

  // Simuliere KI-Training basierend auf historischen Ergebnissen
  async updateModel(historicalGames: Game[]): Promise<void> {
    console.log(`Updating AI model with ${historicalGames.length} historical games...`);
    
    // Simuliere Model-Update
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Adjustiere Team-Stats basierend auf Performance
    for (const game of historicalGames) {
      if (game.status === 'completed' && game.homeScore !== undefined && game.awayScore !== undefined) {
        this.adjustTeamStats(game);
      }
    }
    
    console.log('AI model updated successfully');
  }

  private adjustTeamStats(game: Game): void {
    const homeStats = this.teamStats.get(game.homeTeam.id);
    const awayStats = this.teamStats.get(game.awayTeam.id);
    
    if (!homeStats || !awayStats || game.homeScore === undefined || game.awayScore === undefined) {
      return;
    }
    
    const homeWon = game.homeScore > game.awayScore;
    const scoreDiff = Math.abs(game.homeScore - game.awayScore);
    
    // Kleine Adjustierungen basierend auf Ergebnis
    const adjustment = Math.min(scoreDiff * 0.1, 2);
    
    if (homeWon) {
      homeStats.recentForm = Math.min(homeStats.recentForm + adjustment, 100);
      awayStats.recentForm = Math.max(awayStats.recentForm - adjustment, 30);
    } else {
      awayStats.recentForm = Math.min(awayStats.recentForm + adjustment, 100);
      homeStats.recentForm = Math.max(homeStats.recentForm - adjustment, 30);
    }
    
    this.teamStats.set(game.homeTeam.id, homeStats);
    this.teamStats.set(game.awayTeam.id, awayStats);
  }
}

export const aiPredictionService = new AIPredictionService();