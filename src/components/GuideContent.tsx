import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardBody, CardHeader } from './ui/Card';
import { Upload, Activity, Clock, AlertTriangle, Lightbulb } from 'lucide-react';

const GuideContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          {t('userGuide')}
        </h2>
        
        <div className="space-y-8">
          {/* How to use */}
          <section>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4 flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              {t('howToUse')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-800 dark:text-blue-200">1</span>
                    </div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      {t('uploadXray')}
                    </h4>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('uploadXrayDescription')}
                  </p>
                  <div className="mt-4 text-center">
                    <Upload className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-800 dark:text-blue-200">2</span>
                    </div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      {t('analyzeImage')}
                    </h4>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('analyzeImageDescription')}
                  </p>
                  <div className="mt-4 text-center">
                    <Activity className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500" />
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-800 dark:text-blue-200">3</span>
                    </div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      {t('reviewResults')}
                    </h4>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('reviewResultsDescription')}
                  </p>
                  <div className="mt-4 text-center">
                    <Clock className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500" />
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>
          
          {/* Understanding Results */}
          <section>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-500" />
              {t('understandingResults')}
            </h3>
            
            <Card>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="font-bold text-xs text-red-600">P</span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800 dark:text-white">
                        {t('pneumonia')}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('pneumoniaResultExplanation')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="font-bold text-xs text-green-600">N</span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800 dark:text-white">
                        {t('normal')}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('normalResultExplanation')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="font-bold text-xs text-yellow-600">%</span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800 dark:text-white">
                        {t('confidenceScore')}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('confidenceScoreExplanation')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </section>
          
          {/* Important Notes */}
          <section>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              {t('importantNotes')}
            </h3>
            
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <CardBody>
                <div className="space-y-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>{t('disclaimer')}</strong> {t('disclaimerDetail')}
                  </p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>{t('medicalAdvice')}</strong> {t('medicalAdviceDetail')}
                  </p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>{t('dataPrivacy')}</strong> {t('dataPrivacyDetail')}
                  </p>
                </div>
              </CardBody>
            </Card>
          </section>
          
          {/* About the Model */}
          <section>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">
              {t('aboutModel')}
            </h3>
            
            <Card>
              <CardBody>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('modelDescription')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('modelPerformance')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('modelLimitations')}
                </p>
              </CardBody>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GuideContent;