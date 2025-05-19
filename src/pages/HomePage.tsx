import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ImageUploader from '../components/ImageUploader';
import { Settings as Lungs } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Lungs className="h-12 w-12 text-blue-700 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('appTitle')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          {t('appDescription')}
        </p>
      </div>
      
      <div className="w-full max-w-xl">
        <ImageUploader />
      </div>
      
      <div className="mt-8 text-center max-w-lg">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          {t('howItWorks')}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('howItWorksDescription')}
        </p>
      </div>
    </div>
  );
};

export default HomePage;