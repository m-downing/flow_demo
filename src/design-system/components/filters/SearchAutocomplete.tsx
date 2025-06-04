import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import Input from '@/design-system/components/forms/Input';

export interface SearchOption {
  value: string;
  label: string;
  category?: string;
}

interface SearchAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SearchOption[];
  placeholder?: string;
  maxResults?: number;
  minSearchLength?: number;
  className?: string;
  disabled?: boolean;
  error?: string;
  allowCustomValue?: boolean;
  fuzzySearch?: boolean;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Search...',
  maxResults = 10,
  minSearchLength = 1,
  className = '',
  disabled = false,
  error,
  allowCustomValue = true,
  fuzzySearch = true,
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<SearchOption[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const isDark = theme === 'dark';

  // Fuzzy search implementation
  const fuzzyMatch = useCallback((pattern: string, str: string): number => {
    pattern = pattern.toLowerCase();
    str = str.toLowerCase();
    
    let patternIdx = 0;
    let score = 0;
    let consecutiveBonus = 0;
    
    for (let i = 0; i < str.length; i++) {
      if (patternIdx < pattern.length && str[i] === pattern[patternIdx]) {
        score += 1 + consecutiveBonus;
        consecutiveBonus += 0.5;
        patternIdx++;
      } else {
        consecutiveBonus = 0;
      }
    }
    
    return patternIdx === pattern.length ? score / str.length : 0;
  }, []);

  // Filter options based on search input
  const filterOptions = useCallback((searchTerm: string) => {
    if (searchTerm.length < minSearchLength) {
      return [];
    }

    let filtered: (SearchOption & { score?: number })[] = [];

    if (fuzzySearch) {
      filtered = options.map(option => ({
        ...option,
        score: Math.max(
          fuzzyMatch(searchTerm, option.label),
          fuzzyMatch(searchTerm, option.value),
          option.category ? fuzzyMatch(searchTerm, option.category) : 0
        ),
      })).filter(option => option.score! > 0);
      
      filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = options.filter(option =>
        option.label.toLowerCase().includes(lowerSearchTerm) ||
        option.value.toLowerCase().includes(lowerSearchTerm) ||
        (option.category && option.category.toLowerCase().includes(lowerSearchTerm))
      );
    }

    return filtered.slice(0, maxResults);
  }, [options, minSearchLength, maxResults, fuzzyMatch, fuzzySearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setHighlightedIndex(-1);
    
    if (allowCustomValue) {
      onChange(newValue);
    }

    const filtered = filterOptions(newValue);
    setFilteredOptions(filtered);
    setIsOpen(filtered.length > 0);
  }, [onChange, allowCustomValue, filterOptions]);

  const handleOptionSelect = useCallback((option: SearchOption) => {
    setInputValue(option.label);
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [isOpen, highlightedIndex, filteredOptions, handleOptionSelect]);

  const handleFocus = useCallback(() => {
    const filtered = filterOptions(inputValue);
    setFilteredOptions(filtered);
    setIsOpen(filtered.length > 0);
  }, [inputValue, filterOptions]);

  const handleBlur = useCallback(() => {
    // Delay hiding to allow for option clicks
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 150);
  }, []);

  const getDropdownClasses = () => {
    const baseClasses = `
      absolute z-50 w-full mt-1 rounded-sm border shadow-lg overflow-auto
    `;
    
    return isDark
      ? `${baseClasses} bg-neutral-800 border-neutral-600`
      : `${baseClasses} bg-white border-neutral-300`;
  };

  const getOptionClasses = (index: number) => {
    const baseClasses = `
      px-3 py-2 cursor-pointer transition-colors duration-150
    `;
    
    const isHighlighted = index === highlightedIndex;
    
    if (isHighlighted) {
      return isDark
        ? `${baseClasses} bg-neutral-700 text-neutral-100`
        : `${baseClasses} bg-primary-100 text-primary-900`;
    }
    
    return isDark
      ? `${baseClasses} text-neutral-100 hover:bg-neutral-700`
      : `${baseClasses} text-neutral-900 hover:bg-neutral-100`;
  };

  const getCategoryHeaderClasses = () => {
    return isDark
      ? 'px-3 py-2 text-xs font-medium text-neutral-400 bg-neutral-900'
      : 'px-3 py-2 text-xs font-medium text-neutral-600 bg-neutral-50';
  };

  const getNoResultsClasses = () => {
    return isDark
      ? 'px-3 py-2 text-neutral-400'
      : 'px-3 py-2 text-neutral-500';
  };

  // Group options by category
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const category = option.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(option);
    return acc;
  }, {} as Record<string, SearchOption[]>);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
    >
      {isMounted && (
        <>
          <Input
            ref={inputRef}
            label={label}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            rightElement={
              isOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )
            }
          />
          
          {isOpen && (
            <div className={getDropdownClasses()}>
              <ul ref={listRef} className="divide-y divide-opacity-10">
                {Object.keys(groupedOptions).length > 0 ? (
                  Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                    <li key={category}>
                      {Object.keys(groupedOptions).length > 1 && category !== 'Other' && (
                        <div className={`px-3 py-1 font-medium ${getCategoryHeaderClasses()}`}>
                          {category}
                        </div>
                      )}
                      <ul>
                        {categoryOptions.map((option, categoryIndex) => {
                          const globalIndex = filteredOptions.indexOf(option);
                          return (
                            <li
                              key={`${option.value}-${categoryIndex}`}
                              className={getOptionClasses(globalIndex)}
                              onClick={() => handleOptionSelect(option)}
                              onMouseEnter={() => setHighlightedIndex(globalIndex)}
                            >
                              <div className="flex flex-col">
                                <span>{option.label}</span>
                                {option.label !== option.value && (
                                  <span className={getCategoryHeaderClasses()}>
                                    {option.value}
                                  </span>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))
                ) : (
                  <li className={getNoResultsClasses()}>
                    No results found
                    {!allowCustomValue && ' - try a different search term'}
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchAutocomplete; 