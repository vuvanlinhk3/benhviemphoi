import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-md transition-colors duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white dark:focus:ring-gray-800',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700 dark:text-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };
  
  const disabledStyles = 'opacity-60 cursor-not-allowed';
  const loadingStyles = 'cursor-wait';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isLoading ? loadingStyles : '',
    disabled ? disabledStyles : '',
    widthStyles,
    className,
  ].join(' ');

  return (
    <button
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;