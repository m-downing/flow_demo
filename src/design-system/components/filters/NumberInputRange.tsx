import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import Input from '@/design-system/components/forms/Input';

interface NumberInputRangeProps {
  label: string;
  min?: number;
  max?: number;
  value: [number | null, number | null];
  onChange: (value: [number | null, number | null]) => void;
  placeholder?: [string, string];
  formatValue?: (value: number) => string;
  parseValue?: (value: string) => number | null;
  unit?: string;
  step?: number;
  className?: string;
  disabled?: boolean;
  error?: string;
}

const NumberInputRange: React.FC<NumberInputRangeProps> = ({
  label,
  min,
  max,
  value,
  onChange,
  placeholder = ['Min', 'Max'],
  parseValue,
  unit,
  step = 1,
  className = '',
  disabled = false,
  error,
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [localValue, setLocalValue] = useState<[string, string]>([
    value[0]?.toString() ?? '',
    value[1]?.toString() ?? '',
  ]);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLocalValue([
      value[0]?.toString() ?? '',
      value[1]?.toString() ?? '',
    ]);
  }, [value]);

  const isDark = theme === 'dark';

  const validateAndParse = useCallback((minStr: string, maxStr: string) => {
    const parseNumber = (str: string): number | null => {
      if (!str.trim()) return null;
      if (parseValue) return parseValue(str);
      
      const num = parseFloat(str);
      return isNaN(num) ? null : num;
    };

    const minNum = parseNumber(minStr);
    const maxNum = parseNumber(maxStr);

    // Validation
    if (minStr && minNum === null) {
      setValidationError('Invalid minimum value');
      return null;
    }
    
    if (maxStr && maxNum === null) {
      setValidationError('Invalid maximum value');
      return null;
    }

    if (minNum !== null && min !== undefined && minNum < min) {
      setValidationError(`Minimum must be at least ${min}${unit || ''}`);
      return null;
    }

    if (maxNum !== null && max !== undefined && maxNum > max) {
      setValidationError(`Maximum must be at most ${max}${unit || ''}`);
      return null;
    }

    if (minNum !== null && maxNum !== null && minNum > maxNum) {
      setValidationError('Minimum cannot be greater than maximum');
      return null;
    }

    setValidationError(null);
    return [minNum, maxNum] as [number | null, number | null];
  }, [min, max, unit, parseValue]);

  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = e.target.value;
    setLocalValue([newMin, localValue[1]]);
    
    const result = validateAndParse(newMin, localValue[1]);
    if (result) {
      onChange(result);
    }
  }, [localValue, onChange, validateAndParse]);

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = e.target.value;
    setLocalValue([localValue[0], newMax]);
    
    const result = validateAndParse(localValue[0], newMax);
    if (result) {
      onChange(result);
    }
  }, [localValue, onChange, validateAndParse]);

  const getLabelClasses = () => {
    return isDark
      ? 'text-primary-100'
      : 'text-neutral-900';
  };

  const getHintClasses = () => {
    return isDark
      ? 'text-primary-300'
      : 'text-neutral-600';
  };

  const displayError = error || validationError;

  return (
    <div 
      className={`space-y-2 ${className}`}
      style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
    >
      {isMounted && (
        <>
          <label className={`text-sm font-medium ${getLabelClasses()}`}>
            {label}
          </label>
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder={placeholder[0]}
              value={localValue[0]}
              onChange={handleMinChange}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              error={displayError ? ' ' : undefined} // Space to maintain layout
              className="text-center"
            />
            
            <Input
              type="number"
              placeholder={placeholder[1]}
              value={localValue[1]}
              onChange={handleMaxChange}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              error={displayError ? ' ' : undefined} // Space to maintain layout
              className="text-center"
            />
          </div>
          
          {displayError && (
            <div className="text-sm text-error-500">
              {displayError}
            </div>
          )}
          
          {(min !== undefined || max !== undefined) && !displayError && (
            <div className={`text-xs ${getHintClasses()}`}>
              {min !== undefined && max !== undefined
                ? `Range: ${min}${unit || ''} - ${max}${unit || ''}`
                : min !== undefined
                ? `Minimum: ${min}${unit || ''}`
                : `Maximum: ${max}${unit || ''}`
              }
            </div>
          )}
          
          {(value[0] !== null || value[1] !== null) && !displayError && (
            <div className={`text-xs ${getHintClasses()}`}>
              Current: {value[0] !== null ? `${value[0]}${unit || ''}` : 'Any'} - {value[1] !== null ? `${value[1]}${unit || ''}` : 'Any'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NumberInputRange; 