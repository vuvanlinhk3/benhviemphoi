import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {currentYear} {t('footerCopyright')}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 text-sm"
            >
              {t('privacyPolicy')}
            </a>
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 text-sm"
            >
              {t('termsOfService')}
            </a>
            <a 
              href="#" 
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 text-sm"
            >
              <Github size={16} />
              <span>{t('sourceCode')}</span>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
            <span>{t('')}</span>
            <Heart size={16} className="text-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;