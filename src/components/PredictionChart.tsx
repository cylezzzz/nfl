import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Prediction } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PredictionChartProps {
  prediction: Prediction;
  homeTeam: string;
  awayTeam: string;
}

const PredictionChart: React.FC<PredictionChartProps> = ({ 
  prediction, 
  homeTeam, 
  awayTeam 
}) => {
  const data = {
    labels: [homeTeam, awayTeam],
    datasets: [
      {
        data: [prediction.homeWinProbability, prediction.awayWinProbability],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <h3 className="text-white font-bold text-lg mb-4 text-center">
        Win Probability
      </h3>
      <div className="max-w-sm mx-auto">
        <Doughnut data={data} options={options} />
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Predicted Score</span>
          <span className="text-white font-bold">
            {prediction.predictedScore.away} - {prediction.predictedScore.home}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/70">Confidence</span>
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 rounded-full h-2 w-20 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400"
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
            <span className="text-white text-sm">{prediction.confidence}%</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-white/20">
          <span className="text-white/70 text-sm">Key Factors:</span>
          <ul className="mt-1 space-y-1">
            {prediction.factors.map((factor, index) => (
              <li key={index} className="text-white/80 text-sm">
                • {factor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PredictionChart;