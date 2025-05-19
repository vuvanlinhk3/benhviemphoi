import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { toastStore, Toast } from '../../hooks/useToast';

const ToastItem: React.FC<{ 
  toast: Toast;
  onClose: (id: string) => void;
}> = ({ toast, onClose }) => {
  const { id, type, message, duration = 5000 } = toast;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    }
  };
  
  return (
    <div 
      className={`flex items-center p-4 mb-3 rounded-md shadow-md border ${getBgColor()} animate-fadeIn`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="flex-grow text-sm text-gray-800 dark:text-gray-200">
        {message}
      </div>
      <button 
        onClick={() => onClose(id)}
        className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe((newToasts) => {
      setToasts(newToasts);
    });
    
    return () => unsubscribe();
  }, []);
  
  const removeToast = (id: string) => {
    toastStore.removeToast(id);
  };
  
  if (!toasts.length) return null;
  
  return createPortal(
    <div className="fixed top-4 right-4 z-50 w-80 max-w-full">
      {toasts.map(toast => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onClose={removeToast} 
        />
      ))}
    </div>,
    document.body
  );
};