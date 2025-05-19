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
  
  const { prediction, probabilities, timestamp } = item;
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
  
  return (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('confidenceScore')}
                  </h4>
                  <ProbabilityChart probabilities={probabilities} />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('recommendation')}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isPneumonia 
                      ? t('pneumoniaRecommendation') 
                      : t('normalRecommendation')}
                  </p>
                  
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      {t('viewFullReport')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default HistoryItem;