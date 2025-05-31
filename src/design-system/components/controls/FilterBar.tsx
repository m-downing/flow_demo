import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../app/contexts/ThemeContext';
import Button from '../primitives/Button';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FilterBarProps {
  timeRange: string;
  region: string;
  priority: string;
  onTimeRangeChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onMoreFiltersClick?: () => void;
  showMoreFilters?: boolean;
}

// Custom Select component for the FilterBar
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  isDark: boolean;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, placeholder, isDark }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const selectClasses = isDark
    ? 'bg-neutral-900 border-neutral-600 text-neutral-300'
    : 'bg-white border-neutral-300 text-neutral-900';

  const optionClasses = isDark
    ? 'bg-neutral-800 text-neutral-100'
    : 'bg-white text-neutral-900';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    // Remove focus after selection
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  // Add global click listener to remove focus when clicking outside
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        selectRef.current.blur();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <select
      ref={selectRef}
      value={value}
      onChange={handleChange}
      className={`
        px-3 py-2 rounded-md border text-sm font-medium
        focus:outline-none transition-colors duration-200
        min-w-[120px]
        ${selectClasses}
      `}
      style={{
        // Remove any focus ring styles completely
        boxShadow: 'none',
      }}
    >
      <option value="" disabled className={optionClasses}>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className={optionClasses}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const FilterBar: React.FC<FilterBarProps> = ({
  timeRange,
  region,
  priority,
  onTimeRangeChange,
  onRegionChange,
  onPriorityChange,
  onMoreFiltersClick,
  showMoreFilters = true,
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === 'dark';

  // Theme-aware container classes - applied only when mounted
  const activeContainerClasses = isDark
    ? 'bg-neutral-950 border-transparent'
    : 'bg-white border-transparent';
  
  // Classes when not mounted (or to ensure smooth transition)
  const initialContainerClasses = 'bg-transparent border-transparent';

  const currentContainerClasses = isMounted ? activeContainerClasses : initialContainerClasses;

  // Filter options
  const timeRangeOptions = [
    { value: 'select', label: 'Select' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'custom', label: 'Custom' },
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'nam', label: 'North America' },
    { value: 'emea', label: 'EMEA' },
    { value: 'apac', label: 'APAC' },
    { value: 'latam', label: 'LATAM' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  // Filter icon SVG
  const FilterIcon = () => (
    <FunnelIcon className="w-4 h-4" />
  );

  // Custom button class to match Select components in light mode
  const moreFiltersButtonClass = isDark 
    ? '!border-neutral-600 !text-neutral-300 hover:!bg-neutral-800 hover:!text-neutral-200' 
    : '!border-neutral-300 !border';

  return (
    <div 
      className={`flex items-center space-x-3 p-4 border rounded-lg ${currentContainerClasses}`} 
      key={`filterbar-${theme}`} 
      style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
    >
      {isMounted && (
        <>
          <Select
            value={timeRange}
            onChange={onTimeRangeChange}
            options={timeRangeOptions}
            placeholder="Time Range"
            isDark={isDark}
          />
          
          <Select
            value={region}
            onChange={onRegionChange}
            options={regionOptions}
            placeholder="Region"
            isDark={isDark}
          />

          <Select
            value={priority}
            onChange={onPriorityChange}
            options={priorityOptions}
            placeholder="Priority"
            isDark={isDark}
          />
          
          {showMoreFilters && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FilterIcon />}
              onClick={onMoreFiltersClick}
              className={moreFiltersButtonClass}
            >
              More Filters
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FilterBar; 