import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { Card, CardBody, CardFooter, CardHeader } from './ui/Card';
import Button from './ui/Button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import ProbabilityChart from './ProbabilityChart';

const ResultDisplay: React.FC = () => {
  const { t } = useLanguage();
  const { currentResult, previewUrl, clearCurrentResult } = useApp();
  
  if (!currentResult || !previewUrl) {
    return null;
  }
  
  const { prediction, probabilities, timestamp } = currentResult;
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
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `xray-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col items-center bg-gray-50 dark:bg-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            {t('analysisResults')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(timestamp)}
          </p>
        </CardHeader>
        
        <CardBody className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* X-ray Image */}
            <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center" style={{ height: '400px' }}>
                <img 
                  src={previewUrl} 
                  alt="X-ray" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            
            {/* Analysis Results */}
            <div className="w-full md:w-1/2 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('diagnosis')}
                </h3>
                <div className={`text-2xl font-bold mb-2 ${
                  isPneumonia 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {isPneumonia ? t('pneumonia') : t('normal')}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isPneumonia 
                    ? t('pneumoniaDescription') 
                    : t('normalDescription')}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('confidenceScore')}
                </h3>
                
                <ProbabilityChart probabilities={probabilities} />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('recommendation')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isPneumonia 
                    ? t('pneumoniaRecommendation') 
                    : t('normalRecommendation')}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
        
        <CardFooter className="flex flex-wrap justify-between items-center gap-4">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={clearCurrentResult}
          >
            {t('analyzeAnother')}
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={handleDownload}
            >
              {t('download')}
            </Button>
            <Button
              variant="primary"
              leftIcon={<Share2 className="h-4 w-4" />}
            >
              {t('share')}
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>{t('disclaimer')}</strong> {t('disclaimerText')}
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;