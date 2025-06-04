import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface CheckboxFilterProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  label,
  value,
  onChange,
  description,
  className = '',
  disabled = false,
  error,
  size = 'md',
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          checkbox: 'w-4 h-4',
          label: 'text-sm',
          description: 'text-xs',
        };
      case 'lg':
        return {
          checkbox: 'w-6 h-6',
          label: 'text-lg',
          description: 'text-sm',
        };
      default:
        return {
          checkbox: 'w-5 h-5',
          label: 'text-base',
          description: 'text-sm',
        };
    }
  };

  const getCheckboxClasses = () => {
    const baseClasses = `
      rounded border-2 transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-opacity-30
      ${getSizeClasses().checkbox}
    `;
    
    if (disabled) {
      return isDark
        ? `${baseClasses} bg-neutral-800 border-neutral-600 cursor-not-allowed opacity-50`
        : `${baseClasses} bg-neutral-100 border-neutral-300 cursor-not-allowed opacity-50`;
    }
    
    if (error) {
      return isDark
        ? `${baseClasses} border-error-500 focus:ring-error-500 ${value ? 'bg-error-600' : 'bg-primary-900'}`
        : `${baseClasses} border-error-500 focus:ring-error-500 ${value ? 'bg-error-500' : 'bg-white'}`;
    }
    
    if (value) {
      return isDark
        ? `${baseClasses} bg-primary-600 border-primary-600 focus:ring-primary-400`
        : `${baseClasses} bg-primary-600 border-primary-600 focus:ring-primary-600`;
    }
    
    return isDark
      ? `${baseClasses} bg-primary-900 border-primary-600 hover:border-primary-500 focus:ring-primary-400`
      : `${baseClasses} bg-white border-neutral-300 hover:border-primary-500 focus:ring-primary-600`;
  };

  const getLabelClasses = () => {
    const baseClasses = `
      font-medium cursor-pointer select-none transition-colors duration-200
      ${getSizeClasses().label}
    `;
    
    if (disabled) {
      return isDark
        ? `${baseClasses} text-neutral-500 cursor-not-allowed`
        : `${baseClasses} text-neutral-400 cursor-not-allowed`;
    }
    
    return isDark
      ? `${baseClasses} text-primary-100 hover:text-primary-50`
      : `${baseClasses} text-neutral-900 hover:text-neutral-700`;
  };

  const getDescriptionClasses = () => {
    const baseClasses = `
      mt-1 transition-colors duration-200
      ${getSizeClasses().description}
    `;
    
    if (disabled) {
      return isDark
        ? `${baseClasses} text-neutral-600`
        : `${baseClasses} text-neutral-400`;
    }
    
    return isDark
      ? `${baseClasses} text-primary-300`
      : `${baseClasses} text-neutral-600`;
  };

  const getContainerClasses = () => {
    const baseClasses = `
      relative flex items-start space-x-3 transition-all duration-200
      ${disabled ? '' : 'hover:bg-opacity-50 rounded-sm p-1 -m-1'}
    `;
    
    if (disabled) {
      return baseClasses;
    }
    
    return isDark
      ? `${baseClasses} hover:bg-primary-800`
      : `${baseClasses} hover:bg-neutral-50`;
  };

  return (
    <div 
      className={`${className}`}
      style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
    >
      {isMounted && (
        <>
          <div className={getContainerClasses()}>
            <div className="flex items-center h-6">
              <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
                disabled={disabled}
                className={getCheckboxClasses()}
                aria-describedby={description ? `${label}-description` : undefined}
              />
              
              {/* Custom checkmark icon */}
              {value && (
                <div className={`absolute pointer-events-none ${getSizeClasses().checkbox} flex items-center justify-center`}>
                  <svg 
                    className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-white`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <label 
                htmlFor={label}
                className={getLabelClasses()}
              >
                {label}
              </label>
              
              {description && (
                <p 
                  id={`${label}-description`}
                  className={getDescriptionClasses()}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {error && (
            <div className="mt-2 text-sm text-error-500">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckboxFilter; 