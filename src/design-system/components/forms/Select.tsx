import React, { SelectHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { useTheme } from '../../../app/contexts/ThemeContext';

/**
 * Option item for Select component
 */
export interface SelectOption {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

/**
 * Select sizes
 */
type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Select component props
 * @interface SelectProps
 * @extends {Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>}
 */
interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select options array */
  options: SelectOption[];
  /** Select label */
  label?: string;
  /** Helper text to display below the select */
  helperText?: string;
  /** Error message to display below the select */
  error?: string;
  /** Select size */
  size?: SelectSize;
  /** Additional class names to apply to the select container */
  containerClassName?: string;
  /** Additional class names to apply to the select element */
  className?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Whether the select should fill its container */
  fullWidth?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      helperText,
      error,
      size = 'md',
      containerClassName = '',
      className = '',
      placeholder,
      fullWidth = false,
      disabled = false,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const isDark = theme === 'dark';

    // Generate a random id if not provided - avoid hydration mismatch
    const [selectId, setSelectId] = useState(id || '');
    
    // Generate ID only on client side to avoid hydration mismatch
    useEffect(() => {
      if (!id) {
        setSelectId(`select-${Math.random().toString(36).substring(2, 9)}`);
      }
    }, [id]);

    // Container classes
    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      ${containerClassName}
    `;
    
    // Select size classes
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-2.5 text-lg',
    };
    
    // Theme-aware select classes
    const getSelectClasses = () => {
      const baseClasses = `
        block w-full rounded-sm border px-3 appearance-none pr-10
        focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-30
        transition-colors duration-200
      `;
      
      if (disabled) {
        return isDark
          ? `${baseClasses} bg-neutral-900 border-neutral-700 text-neutral-500 cursor-not-allowed`
          : `${baseClasses} bg-neutral-100 border-neutral-300 text-neutral-500 cursor-not-allowed`;
      }
      
      if (error) {
        return isDark
          ? `${baseClasses} bg-neutral-900 border-error-500 text-neutral-100 focus:border-error-500 focus-visible:ring-error-500`
          : `${baseClasses} bg-white border-error-500 text-neutral-900 focus:border-error-500 focus-visible:ring-error-500`;
      }
      
      return isDark
        ? `${baseClasses} bg-neutral-900 border-neutral-600 text-neutral-100 focus:border-neutral-400 focus-visible:ring-neutral-400`
        : `${baseClasses} bg-white border-neutral-300 text-neutral-900 focus:border-primary-600 focus-visible:ring-primary-600`;
    };
    
    // Theme-aware option classes
    const optionClasses = isDark
      ? 'bg-neutral-900 text-neutral-100'
      : 'bg-white text-neutral-900';
    
    // Theme-aware label classes
    const labelClasses = isDark
      ? 'text-neutral-100'
      : 'text-neutral-900';
    
    // Theme-aware icon classes
    const iconClasses = isDark
      ? 'text-neutral-400'
      : 'text-neutral-500';
    
    // Theme-aware helper text classes
    const helperTextClasses = isDark
      ? 'text-neutral-300'
      : 'text-neutral-600';
    
    return (
      <div 
        className={containerClasses}
        key={`select-${theme}-${isMounted}`}
        style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
      >
        {isMounted && (
          <>
            {/* Label */}
            {label && (
              <label
                htmlFor={selectId}
                className={`mb-1.5 block text-sm font-medium ${labelClasses}`}
              >
                {label}
                {required && <span className="ml-1 text-error-500">*</span>}
              </label>
            )}
            
            {/* Select wrapper with relative positioning for icon */}
            <div className="relative">
              {/* Select element */}
              <select
                ref={ref}
                id={selectId}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
                className={`
                  ${getSelectClasses()}
                  ${sizeClasses[size]}
                  ${className}
                `}
                required={required}
                {...props}
              >
                {placeholder && (
                  <option value="" disabled className={optionClasses}>
                    {placeholder}
                  </option>
                )}
                {options.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled} className={optionClasses}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {/* Dropdown arrow icon */}
              <div className="absolute right-0 inset-y-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className={`h-4 w-4 ${iconClasses}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            
            {/* Helper text or error message */}
            {(helperText || error) && (
              <div
                id={error ? `${selectId}-error` : `${selectId}-helper`}
                className={`mt-1 text-sm ${error ? 'text-error-500' : helperTextClasses}`}
              >
                {error || helperText}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select; 