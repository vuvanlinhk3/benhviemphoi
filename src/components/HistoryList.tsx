import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { Card, CardBody } from './ui/Card';
import { Search, Filter, Clock } from 'lucide-react';
import Button from './ui/Button';
import HistoryItem from './HistoryItem';

const HistoryList: React.FC = () => {
  const { t } = useLanguage();
  const { analysisHistory, loadHistory, isHistoryLoading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pneumonia' | 'normal'>('all');

  // Tải lịch sử khi component được mount
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredHistory = analysisHistory.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'pneumonia' && item.prediction === 'Pneumonia') ||
      (filterType === 'normal' && item.prediction === 'Normal');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          {t('analysisHistory')}
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              {t('all')}
            </Button>
            <Button
              variant={filterType === 'pneumonia' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterType('pneumonia')}
            >
              {t('pneumonia')}
            </Button>
            <Button
              variant={filterType === 'normal' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterType('normal')}
            >
              {t('normal')}
            </Button>
          </div>
        </div>

        {/* Loading or Results */}
        {isHistoryLoading ? (
          <Card>
            <CardBody className="flex flex-col items-center justify-center py-12">
              <Clock className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4 animate-spin" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('loadingHistory') || 'Đang tải lịch sử...'}
              </h3>
            </CardBody>
          </Card>
        ) : filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <Card>
            <CardBody className="flex flex-col items-center justify-center py-12">
              <Clock className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                {searchTerm || filterType !== 'all' 
                  ? t('noMatchingResults') 
                  : t('noHistory')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                {searchTerm || filterType !== 'all' 
                  ? t('tryDifferentSearch') 
                  : t('startAnalyzing')}
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HistoryList;
