import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import Button from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/useToast';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ImageUploader: React.FC = () => {
  const { t } = useLanguage();
  const { selectedImage, setSelectedImage, previewUrl, analyzeCurrentImage, isAnalyzing } = useApp();
  const { showToast } = useToast();
  
  const [zoom, setZoom] = useState(1);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (file.size > MAX_FILE_SIZE) {
      showToast({
        type: 'error',
        message: t('fileTooLarge'),
      });
      return;
    }
    
    if (!file.type.includes('image/')) {
      showToast({
        type: 'error',
        message: t('invalidFileType'),
      });
      return;
    }
    
    setSelectedImage(file);
  }, [setSelectedImage, showToast, t]);
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1,
  });
  
  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };
  
  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const resetImage = () => {
    setSelectedImage(null);
    setZoom(1);
  };
  
  const getDropzoneClasses = () => {
    return `border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
      isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
    } ${isDragReject ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}`;
  };
  
  return (
    <div className="w-full">
      {!selectedImage ? (
        <div {...getRootProps()} className={getDropzoneClasses()}>
          <input {...getInputProps()} />
          <Upload 
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" 
          />
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            {isDragActive 
              ? t('dropImageHere') 
              : t('dragAndDropImage')}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {t('supportedFormats')}
          </p>
          <Button variant="outline" size="sm">
            {t('browseFiles')}
          </Button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ImageIcon className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                {selectedImage.name}
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={zoomOut}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={zoomIn}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={zoom >= 3}
              >
                <ZoomIn className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={resetImage}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="relative w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900 flex items-center justify-center" style={{ height: '400px' }}>
            {previewUrl && (
              <div
                className="cursor-move"
                style={{
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.2s',
                }}
              >
                <img
                  src={previewUrl}
                  alt="X-ray preview"
                  className="max-h-[400px] max-w-full object-contain"
                />
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button
              onClick={analyzeCurrentImage}
              isLoading={isAnalyzing}
              variant="primary"
              size="lg"
              leftIcon={!isAnalyzing && <Upload className="h-5 w-5" />}
            >
              {isAnalyzing ? t('analyzing') : t('analyzeImage')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;