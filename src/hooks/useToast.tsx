import { v4 as uuidv4 } from 'uuid';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  subscribe: (callback: (toasts: Toast[]) => void) => () => void;
}

// Simple toast store implementation
const createToastStore = (): ToastStore => {
  let toasts: Toast[] = [];
  const listeners = new Set<(toasts: Toast[]) => void>();
  
  const subscribe = (callback: (toasts: Toast[]) => void) => {
    listeners.add(callback);
    callback(toasts);
    
    return () => {
      listeners.delete(callback);
    };
  };
  
  const notify = () => {
    listeners.forEach(listener => listener(toasts));
  };
  
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    toasts = [...toasts, { ...toast, id }];
    notify();
    return id;
  };
  
  const removeToast = (id: string) => {
    toasts = toasts.filter(toast => toast.id !== id);
    notify();
  };
  
  return {
    get toasts() {
      return toasts;
    },
    addToast,
    removeToast,
    subscribe,
  };
};

export const toastStore = createToastStore();

export const useToast = () => {
  const showToast = (toast: Omit<Toast, 'id'>) => {
    return toastStore.addToast(toast);
  };
  
  return { showToast };
};