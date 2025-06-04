import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import Input from '@/design-system/components/forms/Input';

interface Suggestion {
  value: string;
  label: string;
  type?: 'history' | 'suggestion' | 'completion';
  frequency?: number;
}

interface TextInputWithSuggestionsProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions?: Suggestion[];
  placeholder?: string;
  maxSuggestions?: number;
  minSearchLength?: number;
  className?: string;
  disabled?: boolean;
  error?: string;
  showHistory?: boolean;
  onHistoryUpdate?: (value: string) => void;
  debounceMs?: number;
}

const TextInputWithSuggestions: React.FC<TextInputWithSuggestionsProps> = ({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder = 'Type to search...',
  maxSuggestions = 8,
  minSearchLength = 1,
  className = '',
  disabled = false,
  error,
  showHistory = true,
  onHistoryUpdate,
  debounceMs = 300,
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsMounted(true);
    // Load search history from localStorage
    if (showHistory) {
      const stored = localStorage.getItem('search-history');
      if (stored) {
        try {
          setSearchHistory(JSON.parse(stored));
        } catch (e) {
          console.warn('Failed to parse search history:', e);
        }
      }
    }
  }, [showHistory]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const isDark = theme === 'dark';

  // Debounced suggestion filtering
  const filterSuggestions = useCallback((searchTerm: string) => {
    if (searchTerm.length < minSearchLength) {
      // Show recent history when no search term
      if (showHistory && searchHistory.length > 0) {
        const historySuggestions: Suggestion[] = searchHistory
          .slice(0, Math.min(5, maxSuggestions))
          .map(item => ({
            value: item,
            label: item,
            type: 'history' as const,
          }));
        setFilteredSuggestions(historySuggestions);
        setIsOpen(historySuggestions.length > 0);
      } else {
        setFilteredSuggestions([]);
        setIsOpen(false);
      }
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Filter and score suggestions
    const scoredSuggestions = suggestions
      .map(suggestion => {
        const labelLower = suggestion.label.toLowerCase();
        const valueLower = suggestion.value.toLowerCase();
        
        let score = 0;
        
        // Exact match gets highest score
        if (labelLower === lowerSearchTerm || valueLower === lowerSearchTerm) {
          score = 100;
        }
        // Starts with gets high score
        else if (labelLower.startsWith(lowerSearchTerm) || valueLower.startsWith(lowerSearchTerm)) {
          score = 80;
        }
        // Contains gets medium score
        else if (labelLower.includes(lowerSearchTerm) || valueLower.includes(lowerSearchTerm)) {
          score = 60;
        }
        // No match
        else {
          return null;
        }
        
        // Boost score based on frequency if available
        if (suggestion.frequency) {
          score += Math.min(suggestion.frequency, 20);
        }
        
        return { ...suggestion, score };
      })
      .filter((item): item is Suggestion & { score: number } => item !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSuggestions);

    // Add history suggestions that match
    const matchingHistory = searchHistory
      .filter(item => 
        item.toLowerCase().includes(lowerSearchTerm) &&
        !scoredSuggestions.some(s => s.value === item)
      )
      .slice(0, 3)
      .map(item => ({
        value: item,
        label: item,
        type: 'history' as const,
        score: 50,
      }));

    const allSuggestions = [...scoredSuggestions, ...matchingHistory]
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSuggestions);

    setFilteredSuggestions(allSuggestions);
    setIsOpen(allSuggestions.length > 0);
  }, [suggestions, minSearchLength, maxSuggestions, showHistory, searchHistory]);

  const debouncedFilter = useCallback((searchTerm: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      filterSuggestions(searchTerm);
    }, debounceMs);
  }, [filterSuggestions, debounceMs]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setHighlightedIndex(-1);
    onChange(newValue);
    debouncedFilter(newValue);
  }, [onChange, debouncedFilter]);

  const addToHistory = useCallback((searchValue: string) => {
    if (!showHistory || !searchValue.trim()) return;
    
    const newHistory = [
      searchValue,
      ...searchHistory.filter(item => item !== searchValue)
    ].slice(0, 10); // Keep only 10 most recent
    
    setSearchHistory(newHistory);
    localStorage.setItem('search-history', JSON.stringify(newHistory));
    onHistoryUpdate?.(searchValue);
  }, [showHistory, searchHistory, onHistoryUpdate]);

  const handleSuggestionSelect = useCallback((suggestion: Suggestion) => {
    setInputValue(suggestion.value);
    onChange(suggestion.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    addToHistory(suggestion.value);
    inputRef.current?.blur();
  }, [onChange, addToHistory]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        filterSuggestions(inputValue);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
          handleSuggestionSelect(filteredSuggestions[highlightedIndex]);
        } else if (inputValue.trim()) {
          addToHistory(inputValue);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
      case 'Tab':
        // Auto-complete with first suggestion on Tab
        if (highlightedIndex === -1 && filteredSuggestions.length > 0) {
          e.preventDefault();
          handleSuggestionSelect(filteredSuggestions[0]);
        }
        break;
    }
  }, [isOpen, highlightedIndex, filteredSuggestions, handleSuggestionSelect, inputValue, addToHistory, filterSuggestions]);

  const handleFocus = useCallback(() => {
    filterSuggestions(inputValue);
  }, [inputValue, filterSuggestions]);

  const handleBlur = useCallback(() => {
    // Delay hiding to allow for clicks inside dropdown
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 150);
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('search-history');
    filterSuggestions(inputValue);
  }, [inputValue, filterSuggestions]);

  const getDropdownClasses = () => {
    const baseClasses = `
      absolute z-50 w-full mt-1 rounded-sm border shadow-lg max-h-60 overflow-auto
    `;
    
    return isDark
      ? `${baseClasses} bg-primary-900 border-primary-600`
      : `${baseClasses} bg-white border-neutral-300`;
  };

  const getSuggestionClasses = (index: number) => {
    const baseClasses = `
      px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between
    `;
    
    const isHighlighted = index === highlightedIndex;
    
    if (isHighlighted) {
      return isDark
        ? `${baseClasses} bg-primary-700 text-primary-100`
        : `${baseClasses} bg-primary-100 text-primary-900`;
    }
    
    return isDark
      ? `${baseClasses} text-primary-100 hover:bg-primary-800`
      : `${baseClasses} text-neutral-900 hover:bg-neutral-100`;
  };

  const getTypeIconClasses = () => {
    return isDark
      ? 'text-primary-400'
      : 'text-neutral-500';
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'history':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'completion':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
    }
  };

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
              <div className="flex items-center space-x-1">
                {isOpen ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>
            }
          />
          
          {isOpen && (
            <div className={getDropdownClasses()}>
              <ul ref={listRef}>
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion.value}-${index}`}
                    className={getSuggestionClasses(index)}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div className={getTypeIconClasses()}>
                        {getTypeIcon(suggestion.type)}
                      </div>
                      <span>{suggestion.label}</span>
                    </div>
                    {suggestion.type === 'history' && (
                      <div className={`text-xs ${isDark ? 'text-primary-400' : 'text-neutral-500'}`}>
                        Recent
                      </div>
                    )}
                  </li>
                ))}
                
                {showHistory && searchHistory.length > 0 && inputValue.length < minSearchLength && (
                  <li className="border-t border-opacity-10">
                    <button
                      onClick={clearHistory}
                      className={`w-full px-3 py-2 text-xs text-left transition-colors duration-150 ${
                        isDark 
                          ? 'text-primary-400 hover:bg-primary-800' 
                          : 'text-neutral-500 hover:bg-neutral-100'
                      }`}
                    >
                      Clear search history
                    </button>
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

export default TextInputWithSuggestions; 