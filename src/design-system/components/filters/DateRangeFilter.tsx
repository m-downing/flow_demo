import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import Input from '@/design-system/components/forms/Input';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DatePreset {
  label: string;
  value: string;
  getRange: () => DateRange;
}

interface DateRangeFilterProps {
  label: string;
  value: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  showPresets?: boolean;
  presets?: DatePreset[];
  allowSingleDate?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: [string, string];
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  label,
  value,
  onChange,
  className = '',
  disabled = false,
  error,
  showPresets = true,
  presets = DEFAULT_PRESETS,
  allowSingleDate = false,
  minDate,
  maxDate,
  placeholder = ['Start date', 'End date'],
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [tempStartDate, setTempStartDate] = useState<string>('');
  const [tempEndDate, setTempEndDate] = useState<string>('');
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Update temp dates when value changes
    setTempStartDate(value.startDate ? formatDateForInput(value.startDate) : '');
    setTempEndDate(value.endDate ? formatDateForInput(value.endDate) : '');
    
    // Check if current value matches a preset
    const matchingPreset = presets.find(preset => {
      const presetRange = preset.getRange();
      return (
        isSameDate(presetRange.startDate, value.startDate) &&
        isSameDate(presetRange.endDate, value.endDate)
      );
    });
    
    setSelectedPreset(matchingPreset?.value || null);
  }, [value, presets]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const isDark = theme === 'dark';

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const parseInputDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const isSameDate = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 && !date2) return true;
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  }, [disabled, isOpen]);

  const handlePresetSelect = useCallback((preset: DatePreset) => {
    const range = preset.getRange();
    onChange(range);
    setSelectedPreset(preset.value);
    setIsOpen(false);
  }, [onChange]);

  const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setTempStartDate(dateStr);
    
    const startDate = parseInputDate(dateStr);
    if (startDate || !dateStr) {
      // Validate date range
      let endDate = value.endDate;
      if (startDate && endDate && startDate > endDate) {
        endDate = allowSingleDate ? null : startDate;
      }
      
      onChange({ startDate, endDate });
      setSelectedPreset(null);
    }
  }, [value.endDate, onChange, allowSingleDate]);

  const handleEndDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setTempEndDate(dateStr);
    
    const endDate = parseInputDate(dateStr);
    if (endDate || !dateStr) {
      // Validate date range
      let startDate = value.startDate;
      if (endDate && startDate && startDate > endDate) {
        startDate = allowSingleDate ? null : endDate;
      }
      
      onChange({ startDate, endDate });
      setSelectedPreset(null);
    }
  }, [value.startDate, onChange, allowSingleDate]);

  const handleClear = useCallback(() => {
    onChange({ startDate: null, endDate: null });
    setSelectedPreset(null);
  }, [onChange]);

  const getLabelClasses = () => {
    return isDark
      ? 'text-neutral-100'
      : 'text-neutral-900';
  };

  const getContainerClasses = () => {
    const baseClasses = `
      relative w-full rounded-sm border px-3 py-2 cursor-pointer
      focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-30
      transition-colors duration-200 min-h-[2.5rem]
    `;
    
    if (disabled) {
      return isDark
        ? `${baseClasses} bg-neutral-900 border-neutral-700 cursor-not-allowed`
        : `${baseClasses} bg-neutral-100 border-neutral-300 cursor-not-allowed`;
    }
    
    if (error) {
      return isDark
        ? `${baseClasses} bg-neutral-800 border-error-500 focus-within:border-error-500 focus-within:ring-error-500`
        : `${baseClasses} bg-white border-error-500 focus-within:border-error-500 focus-within:ring-error-500`;
    }
    
    return isDark
      ? `${baseClasses} bg-neutral-800 border-neutral-600 focus-within:border-neutral-400 focus-within:ring-neutral-400`
      : `${baseClasses} bg-white border-neutral-300 focus-within:border-neutral-600 focus-within:ring-neutral-600`;
  };

  const getDropdownClasses = () => {
    const baseClasses = `
      absolute z-[99999] w-full mt-1 rounded-sm border shadow-lg overflow-hidden
    `;
    
    return isDark
      ? `${baseClasses} bg-neutral-800 border-neutral-600`
      : `${baseClasses} bg-white border-neutral-300`;
  };

  const getPresetButtonClasses = (isActive: boolean) => {
    const baseClasses = `
      px-3 py-2 text-sm rounded-sm transition-colors duration-200 cursor-pointer
      hover:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-30
    `;
    
    if (isActive) {
      return isDark
        ? `${baseClasses} bg-neutral-700 text-neutral-100 focus-visible:ring-neutral-400`
        : `${baseClasses} bg-neutral-200 text-neutral-900 focus-visible:ring-neutral-600`;
    }
    
    return isDark
      ? `${baseClasses} text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100 focus-visible:ring-neutral-400`
      : `${baseClasses} text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-600`;
  };

  const getSelectedTextClasses = () => {
    return isDark
      ? 'text-neutral-100'
      : 'text-neutral-900';
  };

  const getPlaceholderClasses = () => {
    return isDark
      ? 'text-neutral-400'
      : 'text-neutral-500';
  };

  const getDisplayText = () => {
    if (selectedPreset) {
      const preset = presets.find(p => p.value === selectedPreset);
      return preset?.label || '';
    }
    
    if (value.startDate || value.endDate) {
      const start = value.startDate ? formatDisplayDate(value.startDate) : 'Any';
      const end = value.endDate ? formatDisplayDate(value.endDate) : 'Any';
      
      if (allowSingleDate && value.startDate && !value.endDate) {
        return formatDisplayDate(value.startDate);
      }
      
      return `${start} - ${end}`;
    }
    
    return '';
  };

  const hasValue = value.startDate || value.endDate;

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
          
          <div ref={containerRef} className="relative">
            <div 
              className={getContainerClasses()}
              onClick={handleToggle}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  {hasValue ? (
                    <span className={`truncate ${getSelectedTextClasses()}`}>{getDisplayText()}</span>
                  ) : (
                    <span className={getPlaceholderClasses()}>
                      Select date range...
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-2">
                  {hasValue && !disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                      className={`hover:scale-110 ${isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-700'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {isOpen && (
              <div className={getDropdownClasses()}>
                {/* Custom date inputs */}
                <div className={`p-3 ${isDark ? 'border-b border-neutral-700' : 'border-b border-neutral-300'}`}>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="date"
                        placeholder={placeholder[0]}
                        value={tempStartDate}
                        onChange={handleStartDateChange}
                        disabled={disabled}
                        min={minDate ? formatDateForInput(minDate) : undefined}
                        max={maxDate ? formatDateForInput(maxDate) : undefined}
                        size="sm"
                      />
                      
                      {!allowSingleDate && (
                        <Input
                          type="date"
                          placeholder={placeholder[1]}
                          value={tempEndDate}
                          onChange={handleEndDateChange}
                          disabled={disabled}
                          min={value.startDate ? formatDateForInput(value.startDate) : minDate ? formatDateForInput(minDate) : undefined}
                          max={maxDate ? formatDateForInput(maxDate) : undefined}
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Presets */}
                {showPresets && presets.length > 0 && (
                  <div className="max-h-48 overflow-y-auto">
                    {presets.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => handlePresetSelect(preset)}
                        className={getPresetButtonClasses(selectedPreset === preset.value)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {error && (
            <div className="text-sm text-error-500">
              {error}
            </div>
          )}
          
          {hasValue && (
            <div className={`text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              {selectedPreset ? `Preset: ${presets.find(p => p.value === selectedPreset)?.label}` : 'Custom range'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Default preset options
export const DEFAULT_PRESETS: DatePreset[] = [
  {
    label: 'Today',
    value: 'today',
    getRange: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);
      return { startDate: today, endDate: endOfDay };
    },
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
    getRange: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      const endOfDay = new Date(yesterday);
      endOfDay.setHours(23, 59, 59, 999);
      return { startDate: yesterday, endDate: endOfDay };
    },
  },
  {
    label: 'Last 7 days',
    value: 'last7days',
    getRange: () => {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const start = new Date();
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last 30 days',
    value: 'last30days',
    getRange: () => {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const start = new Date();
      start.setDate(start.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This month',
    value: 'thismonth',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last month',
    value: 'lastmonth',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      end.setHours(23, 59, 59, 999);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This quarter',
    value: 'thisquarter',
    getRange: () => {
      const now = new Date();
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3, 1);
      const end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
      end.setHours(23, 59, 59, 999);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This year',
    value: 'thisyear',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      end.setHours(23, 59, 59, 999);
      return { startDate: start, endDate: end };
    },
  },
];

export default DateRangeFilter; 