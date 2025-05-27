'use client';

import React, { useState, useEffect } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Modal from '../Modal';
import Select, { SelectOption } from '../../components/forms/Select';
import Tooltip from '../../components/feedback/Tooltip';
import LightDarkModeToggle from '../../utilities/LightDarkModeToggle';
import { useTheme } from '../../../app/contexts/ThemeContext';

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({ isOpen, onClose }) => {
  const [primaryApp, setPrimaryApp] = useState<string>('flow');
  const { theme, setTheme } = useTheme();
  const [localThemeMode, setLocalThemeMode] = useState<'light' | 'dark'>(theme);

  // Initialize with current theme when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalThemeMode(theme);
      
      // Load saved primary app preference if you have one
      const savedApp = localStorage.getItem('primaryApp');
      if (savedApp) {
        setPrimaryApp(savedApp);
      }
    }
  }, [isOpen, theme]);

  // Primary app options
  const appOptions: SelectOption[] = [
    { value: 'flow', label: 'Flow (default)' },
    { value: 'helius', label: 'Helius' },
    { value: 'hyperion', label: 'Hyperion' },
    { value: 'mimir', label: 'Mimir' },
    { value: 'oculus', label: 'Oculus' },
  ];

  const handleSave = () => {
    // Save preferences to localStorage
    localStorage.setItem('primaryApp', primaryApp);
    
    // Only update theme if it doesn't match localThemeMode (edge case handling)
    if (theme !== localThemeMode) {
      setTheme(localThemeMode);
    }
    
    console.log('Saving preferences:', { primaryApp, themeMode: localThemeMode });
    onClose();
  };

  const handleThemeChange = (mode: 'light' | 'dark') => {
    // Update local and global theme
    setLocalThemeMode(mode);
    setTheme(mode);
  };

  const modalFooter = (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium border border-neutral-300 rounded-md text-neutral-700 bg-neutral-50 hover:bg-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="px-4 py-2 text-sm font-medium border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
      >
        Save Changes
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Preferences"
      size="md"
      footer={modalFooter}
    >
      <div className="space-y-6">
        {/* Primary App Preference */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
              Primary App Preference
            </label>
            <Tooltip
              content="Choose which app should load as default when you visit Flow"
              position="top"
              delay={200}
            >
              <InformationCircleIcon 
                className="h-4 w-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-help transition-colors duration-200" 
              />
            </Tooltip>
          </div>
          <Select
            options={appOptions}
            value={primaryApp}
            onChange={(e) => setPrimaryApp(e.target.value)}
            placeholder="Select primary app"
            fullWidth
          />
        </div>

        {/* Theme Preference */}
        <div>
          <div className="mb-3">
            <label className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
              Theme Preference
            </label>
          </div>
          <LightDarkModeToggle
            mode={localThemeMode}
            onChange={handleThemeChange}
            enhanced={true}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UserPreferencesModal; 