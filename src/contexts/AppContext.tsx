import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { analyzeImage } from '../services/api';

export type Page = 'home' | 'result' | 'history' | 'guide';
export type AnalysisResult = {
  id: string;
  prediction: 'Pneumonia' | 'Normal';
  probabilities: {
    pneumonia: number;
    normal: number;
  };
  timestamp: string;
  heatmap?: string;
};

interface AppContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  previewUrl: string | null;
  isAnalyzing: boolean;
  currentResult: AnalysisResult | null;
  analyzeCurrentImage: () => Promise<void>;
  analysisHistory: AnalysisResult[];
  clearCurrentResult: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  const { showToast } = useToast();

  // Create object URL for preview when image is selected
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const analyzeCurrentImage = async () => {
    if (!selectedImage) {
      showToast({
        type: 'error',
        message: 'Please select an image first',
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Call API to analyze image
      const result = await analyzeImage(selectedImage);
      setCurrentResult(result);
      
      // Add to history
      setAnalysisHistory(prev => [result, ...prev]);
      
      // Navigate to result page
      navigateTo('result');
      
      showToast({
        type: 'success',
        message: 'Analysis completed successfully',
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Error analyzing image',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearCurrentResult = () => {
    setCurrentResult(null);
    setSelectedImage(null);
    navigateTo('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedImage,
        setSelectedImage,
        previewUrl,
        isAnalyzing,
        currentResult,
        analyzeCurrentImage,
        analysisHistory,
        clearCurrentResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};