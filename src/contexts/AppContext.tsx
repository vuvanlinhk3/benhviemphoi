// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useToast } from '../hooks/useToast';
// import { analyzeImage } from '../services/api';

// export type Page = 'home' | 'result' | 'history' | 'guide';
// export type AnalysisResult = {
//   id: string;
//   prediction: 'Pneumonia' | 'Normal';
//   probabilities: {
//     pneumonia: number;
//     normal: number;
//   };
//   timestamp: string;
//   heatmap?: string;
// };

// interface AppContextType {
//   currentPage: Page;
//   navigateTo: (page: Page) => void;
//   selectedImage: File | null;
//   setSelectedImage: (file: File | null) => void;
//   previewUrl: string | null;
//   isAnalyzing: boolean;
//   currentResult: AnalysisResult | null;
//   analyzeCurrentImage: () => Promise<void>;
//   analysisHistory: AnalysisResult[];
//   clearCurrentResult: () => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentPage, setCurrentPage] = useState<Page>('home');
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
//   const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

//   const { showToast } = useToast();

//   // Create object URL for preview when image is selected
//   useEffect(() => {
//     if (selectedImage) {
//       const url = URL.createObjectURL(selectedImage);
//       setPreviewUrl(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setPreviewUrl(null);
//     }
//   }, [selectedImage]);

//   const navigateTo = (page: Page) => {
//     setCurrentPage(page);
//   };

//   const analyzeCurrentImage = async () => {
//     if (!selectedImage) {
//       showToast({
//         type: 'error',
//         message: 'Please select an image first',
//       });
//       return;
//     }

//     setIsAnalyzing(true);
//     try {
//       // Call API to analyze image
//       const result = await analyzeImage(selectedImage);
//       setCurrentResult(result);
      
//       // Add to history
//       setAnalysisHistory(prev => [result, ...prev]);
      
//       // Navigate to result page
//       navigateTo('result');
      
//       showToast({
//         type: 'success',
//         message: 'Analysis completed successfully',
//       });
//     } catch (error) {
//       showToast({
//         type: 'error',
//         message: 'Error analyzing image',
//       });
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const clearCurrentResult = () => {
//     setCurrentResult(null);
//     setSelectedImage(null);
//     navigateTo('home');
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         currentPage,
//         navigateTo,
//         selectedImage,
//         setSelectedImage,
//         previewUrl,
//         isAnalyzing,
//         currentResult,
//         analyzeCurrentImage,
//         analysisHistory,
//         clearCurrentResult,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = (): AppContextType => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error('useApp must be used within an AppProvider');
//   }
//   return context;
// };



// ---------------------------------------
import {useCallback, createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '../hooks/useToast';
import { analyzeImage, getAnalysisHistory } from '../services/api';

export type Page = 'home' | 'result' | 'history' | 'guide';

export type AnalysisResult = {
  id: string;
  prediction: 'Pneumonia' | 'Normal';
  probabilities: {
    pneumonia: number;
    normal: number;
  };
  timestamp: string;
  imagePath: string;
};

interface AppContextType {
  // Navigation
  currentPage: Page;
  navigateTo: (page: Page) => void;
  
  // Image Handling
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  previewUrl: string | null;
  
  // Analysis
  isAnalyzing: boolean;
  isHistoryLoading: boolean;
  currentResult: AnalysisResult | null;
  analyzeCurrentImage: () => Promise<void>;
  analysisHistory: AnalysisResult[];
  clearResults: () => void;
  loadHistory: () => Promise<void>;
  setCurrentResult: (result: AnalysisResult | null) => void;
  clearCurrentResult: () => void; // Thêm dòng này
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  const { showToast } = useToast();
  const clearCurrentResult = () => {
     setSelectedImage(null);
    setCurrentResult(null);
    navigateTo('home');
  };
  // Xử lý preview ảnh
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [selectedImage]);

  // Navigation
  const navigateTo = (page: Page) => setCurrentPage(page);

  // Xử lý phân tích ảnh
  const analyzeCurrentImage = async () => {
    if (!selectedImage) {
      showToast({ type: 'error', message: 'Vui lòng chọn ảnh trước khi phân tích' });
      return;
    }

    setIsAnalyzing(true);
    try {
      const apiResponse = await analyzeImage(selectedImage);
      
      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        prediction: apiResponse.result,
        probabilities: {
          pneumonia: apiResponse.pneumonia_prob,
          normal: apiResponse.normal_prob
        },
        timestamp: apiResponse.analyzed_at,
        imagePath: apiResponse.image_path
      };

      setCurrentResult(newResult);
      setAnalysisHistory(prev => [newResult, ...prev]);
      navigateTo('result');
      showToast({ type: 'success', message: 'Phân tích thành công!' });

    } catch (error) {
      console.error('Lỗi phân tích:', error);
      showToast({ type: 'error', message: 'Lỗi phân tích ảnh' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadHistory = useCallback(async () => {
  setIsHistoryLoading(true);
  try {
    const history = await getAnalysisHistory();
    setAnalysisHistory(history);
  } catch (error) {
    console.error('Lỗi tải lịch sử:', error);
    showToast({ type: 'error', message: 'Lỗi tải lịch sử phân tích' });
  } finally {
    setIsHistoryLoading(false);
  }
}, []);

  // Xóa kết quả
  const clearResults = () => {
    setSelectedImage(null);
    setCurrentResult(null);
    navigateTo('home');
  };

  return (
    <AppContext.Provider
      value={{
        setCurrentResult, 
        clearCurrentResult,
        currentPage,
        navigateTo,
        selectedImage,
        setSelectedImage,
        previewUrl,
        isAnalyzing,
        isHistoryLoading,
        currentResult,
        analyzeCurrentImage,
        analysisHistory,
        clearResults,
        loadHistory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);