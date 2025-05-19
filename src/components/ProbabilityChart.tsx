import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProbabilityChartProps {
  probabilities: {
    pneumonia: number;
    normal: number;
  };
}

const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ probabilities }) => {
  const { t } = useLanguage();
  
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };
  
  return (
    <div className="w-full">
      {/* Bar Chart */}
      <div className="space-y-3">
        {/* Pneumonia */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('pneumonia')}
            </span>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              {formatPercentage(probabilities.pneumonia)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-red-600 dark:bg-red-500 h-2.5 rounded-full" 
              style={{ width: `${probabilities.pneumonia * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Normal */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('normal')}
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {formatPercentage(probabilities.normal)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${probabilities.normal * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Confidence Indicator */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {t('lowConfidence')}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {t('highConfidence')}
          </span>
        </div>
        <div className="relative w-full h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-green-500 rounded-full">
          {/* Confidence Marker */}
          {(probabilities.pneumonia > 0.5 
            ? probabilities.pneumonia 
            : probabilities.normal) > 0.6 && (
            <div 
              className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-300 dark:border-gray-600 rounded-full transform -translate-y-1/2 shadow-md"
              style={{ 
                left: `${(Math.max(probabilities.pneumonia, probabilities.normal) * 100) - 2}%`,
                transition: 'left 0.3s ease-out'
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProbabilityChart;