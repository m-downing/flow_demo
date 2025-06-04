import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface NumberRangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
  unit?: string;
  className?: string;
  disabled?: boolean;
}

const NumberRangeSlider: React.FC<NumberRangeSliderProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue,
  unit,
  className = '',
  disabled = false,
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const isDark = theme === 'dark';

  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1]);
    const newValue: [number, number] = [newMin, localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  }, [localValue, onChange]);

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0]);
    const newValue: [number, number] = [localValue[0], newMax];
    setLocalValue(newValue);
    onChange(newValue);
  }, [localValue, onChange]);

  const formatDisplayValue = (val: number) => {
    if (formatValue) return formatValue(val);
    return unit ? `${val}${unit}` : val.toString();
  };

  const getSliderClasses = () => {
    const baseClasses = `
      absolute w-full h-2 rounded-full appearance-none bg-transparent cursor-pointer
      focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-30
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
      [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:shadow-md
    `;
    
    if (disabled) {
      return `${baseClasses} cursor-not-allowed opacity-50`;
    }
    
    return isDark
      ? `${baseClasses} focus-visible:ring-neutral-400 [&::-webkit-slider-thumb]:bg-neutral-300 [&::-webkit-slider-thumb]:border-neutral-500`
      : `${baseClasses} focus-visible:ring-primary-600 [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:border-white`;
  };

  const getTrackClasses = () => {
    return isDark
      ? 'bg-neutral-600'
      : 'bg-neutral-300';
  };

  const getProgressClasses = () => {
    return isDark
      ? 'bg-neutral-400'
      : 'bg-primary-600';
  };

  const getLabelClasses = () => {
    return isDark
      ? 'text-neutral-100'
      : 'text-neutral-900';
  };

  const getValueDisplayClasses = () => {
    return isDark
      ? 'text-neutral-300'
      : 'text-neutral-600';
  };

  const leftPercent = ((localValue[0] - min) / (max - min)) * 100;
  const rightPercent = ((localValue[1] - min) / (max - min)) * 100;

  return (
    <div 
      className={`space-y-2 ${className}`}
      style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
    >
      {isMounted && (
        <>
          <div className="flex justify-between items-center">
            <label className={`text-sm font-medium ${getLabelClasses()}`}>
              {label}
            </label>
            <div className={`text-sm ${getValueDisplayClasses()}`}>
              {formatDisplayValue(localValue[0])} - {formatDisplayValue(localValue[1])}
            </div>
          </div>
          
          <div className="relative">
            {/* Track */}
            <div className={`h-2 rounded-full ${getTrackClasses()}`} />
            
            {/* Progress */}
            <div
              className={`absolute h-2 rounded-full ${getProgressClasses()}`}
              style={{
                left: `${leftPercent}%`,
                width: `${rightPercent - leftPercent}%`,
              }}
            />
            
            {/* Min slider */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue[0]}
              onChange={handleMinChange}
              disabled={disabled}
              className={getSliderClasses()}
              style={{ zIndex: localValue[0] > max - (max - min) / 2 ? 2 : 1 }}
            />
            
            {/* Max slider */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue[1]}
              onChange={handleMaxChange}
              disabled={disabled}
              className={getSliderClasses()}
              style={{ zIndex: localValue[1] < min + (max - min) / 2 ? 2 : 1 }}
            />
          </div>
          
          <div className="flex justify-between">
            <span className={`text-xs ${getValueDisplayClasses()}`}>
              {formatDisplayValue(min)}
            </span>
            <span className={`text-xs ${getValueDisplayClasses()}`}>
              {formatDisplayValue(max)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default NumberRangeSlider; 