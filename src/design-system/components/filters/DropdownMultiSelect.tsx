import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

interface DropdownMultiSelectProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  searchable?: boolean;
  maxSelections?: number;
  maxHeight?: number;
  groupBy?: boolean;
  showSelectAll?: boolean;
  showChips?: boolean;
}

const DropdownMultiSelect: React.FC<DropdownMultiSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select options...',
  className = '',
  disabled = false,
  error,
  searchable = true,
  maxSelections,
  maxHeight = 240,
  groupBy = false,
  showSelectAll = true,
  showChips = true,
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<MultiSelectOption[]>(options);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (searchable) {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [options, searchTerm, searchable]);

  const isDark = theme === 'dark';

  const selectedOptions = options.filter(opt => value.includes(opt.value));

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  }, [disabled, isOpen, searchable]);

  const handleOptionToggle = useCallback((optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return; // Don't add if max selections reached
      }
      onChange([...value, optionValue]);
    }
  }, [value, onChange, maxSelections]);

  const handleRemoveChip = useCallback((optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  }, [value, onChange]);

  const handleSelectAll = useCallback(() => {
    const availableOptions = filteredOptions.filter(opt => !opt.disabled);
    const newValues = [...new Set([...value, ...availableOptions.map(opt => opt.value)])];
    
    if (maxSelections) {
      onChange(newValues.slice(0, maxSelections));
    } else {
      onChange(newValues);
    }
  }, [filteredOptions, value, onChange, maxSelections]);

  const handleDeselectAll = useCallback(() => {
    const filteredValues = filteredOptions.map(opt => opt.value);
    onChange(value.filter(v => !filteredValues.includes(v)));
  }, [filteredOptions, value, onChange]);

  const handleClearAll = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  }, [onChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  }, []);

  const handleBlur = useCallback(() => {
    // Delay hiding to allow for option clicks
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }, 150);
  }, []);

  const getLabelClasses = () => {
    return isDark
      ? 'text-neutral-100'
      : 'text-neutral-900';
  };

  const getContainerClasses = () => {
    const baseClasses = `
      relative w-full rounded-sm border px-3 py-2 cursor-pointer
      focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-30
      transition-colors duration-200
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
      : `${baseClasses} bg-white border-neutral-300 focus-within:border-primary-600 focus-within:ring-primary-600`;
  };

  const getChipClasses = () => {
    return isDark
      ? 'inline-flex items-center px-2 py-1 text-xs rounded-md bg-neutral-700 text-neutral-100'
      : 'inline-flex items-center px-2 py-1 text-xs rounded-md bg-primary-100 text-primary-900';
  };

  const getRemoveChipClasses = () => {
    return isDark
      ? 'text-primary-300 hover:text-primary-100'
      : 'text-primary-600 hover:text-primary-900';
  };

  const getDropdownClasses = () => {
    const baseClasses = `
      absolute z-50 w-full mt-1 rounded-sm border shadow-lg overflow-auto
    `;
    
    return isDark
      ? `${baseClasses} bg-neutral-800 border-neutral-600`
      : `${baseClasses} bg-white border-neutral-300`;
  };

  const getOptionClasses = (option: MultiSelectOption, isSelected: boolean) => {
    const baseClasses = `
      px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between
    `;
    
    if (option.disabled) {
      return isDark
        ? `${baseClasses} text-neutral-500 cursor-not-allowed`
        : `${baseClasses} text-neutral-400 cursor-not-allowed`;
    }
    
    if (isSelected) {
      return isDark
        ? `${baseClasses} bg-neutral-700 text-neutral-100`
        : `${baseClasses} bg-primary-100 text-primary-900`;
    }
    
    return isDark
      ? `${baseClasses} text-neutral-100 hover:bg-neutral-700`
      : `${baseClasses} text-neutral-900 hover:bg-neutral-100`;
  };

  const getGroupHeaderClasses = () => {
    return isDark
      ? 'px-3 py-2 text-xs font-medium text-neutral-400 bg-neutral-900'
      : 'px-3 py-2 text-xs font-medium text-neutral-600 bg-neutral-50';
  };

  const getPlaceholderClasses = () => {
    return isDark
      ? 'text-neutral-400'
      : 'text-neutral-500';
  };

  const getSearchClasses = () => {
    const baseClasses = 'w-full px-3 py-2 bg-transparent outline-none border-b';
    
    return isDark
      ? `${baseClasses} text-neutral-100 border-neutral-700 placeholder-neutral-400`
      : `${baseClasses} text-neutral-900 border-neutral-300 placeholder-neutral-500`;
  };

  const getControlsClasses = () => {
    return isDark
      ? 'px-3 py-2 text-xs border-b border-primary-700 bg-primary-800'
      : 'px-3 py-2 text-xs border-b border-neutral-300 bg-neutral-50';
  };

  const getControlButtonClasses = () => {
    return isDark
      ? 'text-primary-400 hover:text-primary-200 cursor-pointer'
      : 'text-primary-600 hover:text-primary-700 cursor-pointer';
  };

  const getCountClasses = () => {
    return isDark
      ? 'text-xs text-primary-300'
      : 'text-xs text-neutral-600';
  };

  // Group options if groupBy is enabled
  const groupedOptions = groupBy && filteredOptions.some(opt => opt.group)
    ? filteredOptions.reduce((acc, option) => {
        const group = option.group || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, MultiSelectOption[]>)
    : { 'All': filteredOptions };

  const filteredSelectedCount = filteredOptions.filter(opt => value.includes(opt.value)).length;
  const isAllFiltered = filteredSelectedCount === filteredOptions.filter(opt => !opt.disabled).length;

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
            {maxSelections && (
              <span className={getCountClasses()}>
                {value.length}/{maxSelections}
              </span>
            )}
          </div>
          
          <div ref={containerRef} className="relative">
            <div 
              className={getContainerClasses()}
              onClick={handleToggle}
            >
              <div className="flex items-center justify-between min-h-[1.5rem]">
                <div className="flex-1 min-w-0">
                  {value.length > 0 && showChips ? (
                    <div className="flex flex-wrap gap-1">
                      {selectedOptions.map((option) => (
                        <span key={option.value} className={getChipClasses()}>
                          {option.label}
                          {!disabled && (
                            <button
                              type="button"
                              onClick={(e) => handleRemoveChip(option.value, e)}
                              className={`ml-1 hover:scale-110 ${getRemoveChipClasses()}`}
                            >
                              ×
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  ) : value.length > 0 ? (
                    <span className={getCountClasses()}>
                      {value.length} option{value.length !== 1 ? 's' : ''} selected
                    </span>
                  ) : (
                    <span className={getPlaceholderClasses()}>
                      {placeholder}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-2">
                  {value.length > 0 && !disabled && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className={`hover:scale-110 ${isDark ? 'text-primary-400 hover:text-primary-200' : 'text-neutral-500 hover:text-neutral-700'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-primary-400' : 'text-neutral-500'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {isOpen && (
              <div 
                className={getDropdownClasses()}
                style={{ maxHeight: `${maxHeight}px` }}
              >
                {searchable && (
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className={getSearchClasses()}
                  />
                )}
                
                {showSelectAll && filteredOptions.length > 1 && (
                  <div className={getControlsClasses()}>
                    <div className="flex justify-between items-center">
                      <span>Select:</span>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={isAllFiltered ? handleDeselectAll : handleSelectAll}
                          className={getControlButtonClasses()}
                        >
                          {isAllFiltered ? 'None' : 'All'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="divide-y divide-opacity-10">
                  {Object.keys(groupedOptions).length > 0 ? (
                    Object.entries(groupedOptions).map(([group, groupOptions]) => (
                      <div key={group}>
                        {groupBy && Object.keys(groupedOptions).length > 1 && group !== 'All' && (
                          <div className={getGroupHeaderClasses()}>
                            {group}
                          </div>
                        )}
                        {groupOptions.map((option) => {
                          const isSelected = value.includes(option.value);
                          const isDisabled = option.disabled || (maxSelections && !isSelected && value.length >= maxSelections);
                          
                          return (
                            <div
                              key={option.value}
                              className={getOptionClasses(option, isSelected)}
                              onClick={() => !isDisabled && handleOptionToggle(option.value)}
                            >
                              <div className="flex flex-col min-w-0">
                                <span className="truncate">{option.label}</span>
                                {option.description && (
                                  <span className={`text-xs ${isDark ? 'text-primary-400' : 'text-neutral-500'}`}>
                                    {option.description}
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  ) : (
                    <div className={`px-3 py-2 text-sm ${isDark ? 'text-primary-300' : 'text-neutral-600'}`}>
                      No options found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="text-sm text-error-500">
              {error}
            </div>
          )}
          
          {value.length > 0 && (
            <div className={getCountClasses()}>
              {value.length} option{value.length !== 1 ? 's' : ''} selected
              {maxSelections && ` (max: ${maxSelections})`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DropdownMultiSelect; 