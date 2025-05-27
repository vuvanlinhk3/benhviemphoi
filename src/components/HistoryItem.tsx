import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AnalysisResult } from '../contexts/AppContext';
import { Card, CardBody } from './ui/Card';
import { Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './ui/Button';
import ProbabilityChart from './ProbabilityChart';

interface HistoryItemProps {
  item: AnalysisResult;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen mode
  
  const { prediction, probabilities, timestamp, imagePath } = item;
  const isPneumonia = prediction === 'Pneumonia';
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const formattedDate = formatDate(timestamp);
  
  // Toggle full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
        <CardBody className="p-0">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isPneumonia 
                    ? 'bg-red-100 dark:bg-red-900/30' 
                    : 'bg-green-100 dark:bg-green-900/30'
                }`}>
                  <span className={`font-bold text-sm ${
                    isPneumonia 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {isPneumonia ? 'P' : 'N'}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className={`font-medium ${
                    isPneumonia 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {isPneumonia ? t('pneumonia') : t('normal')}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formattedDate}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  rightIcon={expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                >
                  {expanded ? t('hideDetails') : t('showDetails')}
                </Button>
              </div>
            </div>
            
            {expanded && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* X-ray Image Column */}
                  <div className="col-span-1">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('xrayImage')}
                    </h4>
                    <div className="border rounded-lg overflow-hidden cursor-pointer" onClick={toggleFullScreen}>
                      <img 
                        src={imagePath} 
                        alt="X-ray scan"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.endsWith('/fallback-image.jpg')) {
                            target.src = '/fallback-image.jpg';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Probability Chart Column */}
                  <div className="col-span-1">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('confidenceScore')}
                    </h4>
                    <ProbabilityChart probabilities={probabilities} />
                  </div>
                  
                  {/* Recommendation Column */}
                  <div className="col-span-1">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('recommendation')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isPneumonia 
                        ? t('pneumoniaRecommendation') 
                        : t('normalRecommendation')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Full-screen Image Overlay */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={toggleFullScreen}
        >
          <img 
            src={imagePath} 
            alt="X-ray scan full screen"
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.endsWith('/fallback-image.jpg')) {
                target.src = '/fallback-image.jpg';
              }
            }}
          />
          <button 
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={toggleFullScreen}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default HistoryItem;