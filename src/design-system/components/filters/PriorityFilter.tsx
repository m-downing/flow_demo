import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import Badge, { BadgeVariant } from '@/design-system/components/feedback/Badge';

interface PriorityLevel {
  value: string;
  label: string;
  badgeVariant: BadgeVariant;
  description?: string;
  count?: number;
  urgencyLevel: number; // 1 = lowest, 5 = highest
  icon?: React.ReactNode;
}

interface PriorityFilterProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  priorities?: PriorityLevel[];
  className?: string;
  disabled?: boolean;
  error?: string;
  allowMultiple?: boolean;
  showCounts?: boolean;
  layout?: 'horizontal' | 'vertical' | 'grid';
  sortOrder?: 'ascending' | 'descending';
}

const PriorityFilter: React.FC<PriorityFilterProps> = ({
  label,
  value,
  onChange,
  priorities = DEFAULT_PRIORITIES,
  className = '',
  disabled = false,
  error,
  allowMultiple = true,
  showCounts = true,
  layout = 'horizontal',
  sortOrder = 'descending', // highest priority first
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === 'dark';

  // Sort priorities based on urgency level
  const sortedPriorities = [...priorities].sort((a, b) => {
    return sortOrder === 'ascending' 
      ? a.urgencyLevel - b.urgencyLevel
      : b.urgencyLevel - a.urgencyLevel;
  });

  const handlePriorityToggle = useCallback((priorityValue: string) => {
    if (disabled) return;

    if (allowMultiple) {
      if (value.includes(priorityValue)) {
        onChange(value.filter(v => v !== priorityValue));
      } else {
        onChange([...value, priorityValue]);
      }
    } else {
      if (value.includes(priorityValue)) {
        onChange([]);
      } else {
        onChange([priorityValue]);
      }
    }
  }, [value, onChange, allowMultiple, disabled]);

  const selectHighPriority = useCallback(() => {
    if (disabled) return;
    const highPriorities = priorities
      .filter(p => p.urgencyLevel >= 4)
      .map(p => p.value);
    onChange(highPriorities);
  }, [priorities, onChange, disabled]);

  const selectCriticalOnly = useCallback(() => {
    if (disabled) return;
    const criticalPriorities = priorities
      .filter(p => p.urgencyLevel === 5)
      .map(p => p.value);
    onChange(criticalPriorities);
  }, [priorities, onChange, disabled]);

  const clearAll = useCallback(() => {
    if (disabled) return;
    onChange([]);
  }, [onChange, disabled]);

  const getLabelClasses = () => {
    return isDark
      ? 'text-primary-100'
      : 'text-neutral-900';
  };

  const getPriorityContainerClasses = () => {
    const baseClasses = `
      relative cursor-pointer transition-all duration-200 rounded-sm p-3 border-2
      hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-30
    `;
    
    if (disabled) {
      return `${baseClasses} cursor-not-allowed opacity-50`;
    }
    
    return isDark
      ? `${baseClasses} hover:bg-primary-800 focus-visible:ring-primary-400`
      : `${baseClasses} hover:bg-neutral-50 focus-visible:ring-primary-600`;
  };

  const getPriorityClasses = (priority: PriorityLevel, isSelected: boolean) => {
    const baseClasses = getPriorityContainerClasses();
    
    if (isSelected) {
      return isDark
        ? `${baseClasses} border-primary-400 bg-primary-900`
        : `${baseClasses} border-primary-600 bg-primary-50`;
    }
    
    return isDark
      ? `${baseClasses} border-primary-700 bg-transparent`
      : `${baseClasses} border-neutral-300 bg-transparent`;
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col space-y-2';
      case 'grid':
        return 'grid grid-cols-2 gap-3';
      default:
        return 'flex flex-wrap gap-3';
    }
  };

  const getCountClasses = () => {
    return isDark
      ? 'text-primary-300 text-xs'
      : 'text-neutral-600 text-xs';
  };

  const getControlsClasses = () => {
    return isDark
      ? 'text-primary-400 hover:text-primary-200'
      : 'text-neutral-600 hover:text-neutral-900';
  };

  const getUrgencyIndicator = (urgencyLevel: number) => {
    const indicators = [];
    for (let i = 0; i < 5; i++) {
      const isFilled = i < urgencyLevel;
      indicators.push(
        <div
          key={i}
          className={`w-1 h-3 rounded-full ${
            isFilled
              ? urgencyLevel >= 4
                ? 'bg-red-500'
                : urgencyLevel >= 3
                ? 'bg-yellow-500'
                : 'bg-green-500'
              : isDark
              ? 'bg-primary-700'
              : 'bg-neutral-300'
          }`}
        />
      );
    }
    return (
      <div className="flex space-x-0.5 items-center">
        {indicators}
      </div>
    );
  };

  const getSelectedSummary = () => {
    if (value.length === 0) return null;
    
    const selectedPriorities = priorities.filter(p => value.includes(p.value));
    const highestUrgency = Math.max(...selectedPriorities.map(p => p.urgencyLevel));
    
    let summaryText = '';
    if (highestUrgency === 5) {
      summaryText = 'Including critical priorities';
    } else if (highestUrgency >= 4) {
      summaryText = 'Including high priorities';
    } else if (highestUrgency >= 3) {
      summaryText = 'Including medium priorities';
    } else {
      summaryText = 'Standard priorities only';
    }
    
    return summaryText;
  };

  return (
    <div 
      className={`space-y-3 ${className}`}
      style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
    >
      {isMounted && (
        <>
          <div className="flex justify-between items-center">
            <label className={`text-sm font-medium ${getLabelClasses()}`}>
              {label}
            </label>
            
            {allowMultiple && !disabled && (
              <div className="flex space-x-2 text-xs">
                <button
                  type="button"
                  onClick={selectCriticalOnly}
                  className={`transition-colors duration-150 ${getControlsClasses()}`}
                >
                  Critical Only
                </button>
                <span className={isDark ? 'text-primary-600' : 'text-neutral-400'}>|</span>
                <button
                  type="button"
                  onClick={selectHighPriority}
                  className={`transition-colors duration-150 ${getControlsClasses()}`}
                >
                  High+
                </button>
                <span className={isDark ? 'text-primary-600' : 'text-neutral-400'}>|</span>
                <button
                  type="button"
                  onClick={clearAll}
                  className={`transition-colors duration-150 ${getControlsClasses()}`}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          
          <div className={getLayoutClasses()}>
            {sortedPriorities.map((priority) => {
              const isSelected = value.includes(priority.value);
              
              return (
                <div
                  key={priority.value}
                  className={getPriorityClasses(priority, isSelected)}
                  onClick={() => handlePriorityToggle(priority.value)}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePriorityToggle(priority.value);
                    }
                  }}
                  title={priority.description || `Toggle ${priority.label} priority`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {priority.icon && (
                        <div className={isDark ? 'text-primary-300' : 'text-neutral-600'}>
                          {priority.icon}
                        </div>
                      )}
                      
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={priority.badgeVariant}
                            size="small"
                          >
                            {priority.label}
                          </Badge>
                          {getUrgencyIndicator(priority.urgencyLevel)}
                        </div>
                        
                        {priority.description && (
                          <div className={`text-xs mt-1 ${isDark ? 'text-primary-300' : 'text-neutral-600'}`}>
                            {priority.description}
                          </div>
                        )}
                        
                        {showCounts && priority.count !== undefined && (
                          <div className={`${getCountClasses()} mt-1`}>
                            {priority.count} {priority.count === 1 ? 'item' : 'items'}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="ml-2">
                        <svg 
                          className={`w-4 h-4 ${isDark ? 'text-primary-300' : 'text-primary-600'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {error && (
            <div className="text-sm text-error-500">
              {error}
            </div>
          )}
          
          {value.length > 0 && (
            <div className={`text-xs ${isDark ? 'text-primary-300' : 'text-neutral-600'}`}>
              {value.length} priorit{value.length !== 1 ? 'ies' : 'y'} selected
              {getSelectedSummary() && (
                <span className="ml-2">• {getSelectedSummary()}</span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Default priority levels for infrastructure systems
export const DEFAULT_PRIORITIES: PriorityLevel[] = [
  {
    value: 'critical',
    label: 'Critical',
    badgeVariant: 'critical',
    description: 'Immediate attention required',
    urgencyLevel: 5,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    value: 'high',
    label: 'High',
    badgeVariant: 'highPriority',
    description: 'High priority, address soon',
    urgencyLevel: 4,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    value: 'standard',
    label: 'Standard',
    badgeVariant: 'standard',
    description: 'Normal priority processing',
    urgencyLevel: 3,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    value: 'low',
    label: 'Low',
    badgeVariant: 'standard',
    description: 'Low priority, when convenient',
    urgencyLevel: 2,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
  },
];

// Supply chain specific priorities
export const SUPPLY_CHAIN_PRIORITIES: PriorityLevel[] = [
  {
    value: 'critical',
    label: 'Critical',
    badgeVariant: 'critical',
    description: 'Business critical, immediate action',
    urgencyLevel: 5,
  },
  {
    value: 'high',
    label: 'High',
    badgeVariant: 'highPriority',
    description: 'High business impact',
    urgencyLevel: 4,
  },
  {
    value: 'standard',
    label: 'Standard',
    badgeVariant: 'standard',
    description: 'Normal business operations',
    urgencyLevel: 3,
  },
];

export default PriorityFilter; 