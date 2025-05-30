'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../../app/contexts/ThemeContext';
import { useNotifications } from '../../app/contexts/NotificationContext';
import NotificationBadge from '../components/feedback/NotificationBadge';
import NotificationsModal from '../overlays/modals/Notifications';
import UserPreferencesModal from '../overlays/modals/UserPreferences';

// Note interface
interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
}

export default function AccountDrawer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { unreadCount } = useNotifications();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isUserPreferencesModalOpen, setIsUserPreferencesModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('scm-notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      // Convert timestamp strings back to Date objects
      const notesWithDates = parsedNotes.map((note: any) => ({
        ...note,
        timestamp: new Date(note.timestamp)
      }));
      setNotes(notesWithDates);
    }
  }, []);

  // Handle click outside to close drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleNotificationsClick = () => {
    setIsNotificationsModalOpen(true);
  };

  const handlePreferencesClick = () => {
    setIsUserPreferencesModalOpen(true);
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
      timestamp: new Date()
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    
    // Save to localStorage
    localStorage.setItem('scm-notes', JSON.stringify(updatedNotes));
    
    // Clear form
    setNoteTitle('');
    setNoteContent('');
  };

  const handleClearForm = () => {
    setNoteTitle('');
    setNoteContent('');
  };

  const toggleNoteExpansion = (noteId: string) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId);
  };

  const handleDeleteNote = (noteId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent note expansion when clicking delete
    
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    // Update localStorage
    localStorage.setItem('scm-notes', JSON.stringify(updatedNotes));
    
    // Clear expansion if this note was expanded
    if (expandedNoteId === noteId) {
      setExpandedNoteId(null);
    }
  };

  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Always show date and time for clarity
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
    
    if (days === 0) {
      return `Today at ${timeStr}`;
    } else if (days === 1) {
      return `Yesterday at ${timeStr}`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Theme-aware classes
  const drawerClasses = isDark
    ? 'bg-primary-900 border-primary-700'
    : 'bg-white border-neutral-200';

  const tabClasses = isDark
    ? 'bg-primary-800 hover:bg-primary-700 border-primary-600'
    : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300';

  const textClasses = isDark
    ? 'text-primary-100'
    : 'text-neutral-900';

  const subtextClasses = isDark
    ? 'text-primary-300'
    : 'text-neutral-500';

  const dividerClasses = 'border-primary-600';

  const iconClasses = isDark
    ? 'text-neutral-200'
    : 'text-neutral-700';

  const inputClasses = isDark
    ? 'bg-primary-800 border-primary-600 text-primary-100 placeholder-primary-400 focus:border-primary-400 focus:ring-primary-400'
    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-primary-600 focus:ring-primary-600';

  const buttonClasses = isDark
    ? 'bg-primary-700 hover:bg-primary-600 text-primary-100'
    : 'bg-primary-600 hover:bg-primary-700 text-white';

  const noteItemClasses = isDark
    ? 'bg-primary-800 hover:bg-primary-700 border-primary-700'
    : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200';

  const timestampClasses = isDark
    ? 'text-primary-400'
    : 'text-neutral-500';

  return (
    <>
      {/* Tab trigger - Only visible when drawer is closed */}
      {!isOpen && (
        <div
          className={`
            fixed top-4 right-0 transition-all duration-300 ease-out z-[60]
          `}
        >
          <button
            onClick={() => setIsOpen(true)}
            className={`
              flex items-center justify-center
              w-8 h-12 rounded-l-lg border border-r-0
              transition-all duration-200
              ${tabClasses}
            `}
            aria-label="Open drawer"
          >
            <ChevronLeftIcon className={`w-4 h-4 ${iconClasses}`} />
          </button>
        </div>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`
          fixed top-0 right-0 h-full w-[500px] z-[60]
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${drawerClasses}
          border-l shadow-2xl flex flex-col
        `}
      >
        {/* Header */}
        <div className={`p-6 border-b ${dividerClasses} flex-shrink-0`}>
          <div className="flex items-center justify-between">
            {/* Preferences text */}
            <div 
              className="cursor-pointer"
              onClick={handlePreferencesClick}
            >
              <h2 className={`text-lg font-semibold ${textClasses}`}>Preferences</h2>
              <p className={`text-sm ${subtextClasses}`}>Manage your account settings</p>
            </div>
            
            {/* User Profile Icon */}
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center cursor-pointer hover:bg-neutral-400 transition-all duration-50 shadow-md"
                onClick={handleNotificationsClick}
              >
                <UserIcon className="w-6 h-6 text-primary-800" />
              </div>
              <NotificationBadge count={unreadCount} variant="md" />
            </div>
          </div>
        </div>

        {/* Content Area - Note Taking System */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Note Input Area - Top Half */}
          <div className="p-6 space-y-4 flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title..."
                className={`
                  w-full px-3 py-2 pr-8 text-sm border rounded-lg
                  focus:outline-none focus:ring-1
                  ${inputClasses}
                `}
              />
              {(noteTitle || noteContent) && (
                <button
                  onClick={handleClearForm}
                  className={`absolute right-2 top-2 p-1 rounded hover:bg-neutral-200 dark:hover:bg-primary-700 transition-colors`}
                  aria-label="Clear form"
                >
                  <XMarkIcon className={`w-4 h-4 ${iconClasses}`} />
                </button>
              )}
            </div>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write your note here..."
              className={`
                w-full px-3 py-2 text-sm border rounded-lg
                focus:outline-none focus:ring-1
                resize-none h-48
                ${inputClasses}
              `}
            />
            <button
              onClick={handleSaveNote}
              disabled={!noteTitle.trim() || !noteContent.trim()}
              className={`
                w-full px-4 py-2 text-sm font-medium rounded-lg
                transition-colors duration-150
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
                ${buttonClasses}
              `}
            >
              <PlusIcon className="w-4 h-4" />
              Save Note
            </button>
          </div>

          {/* Divider */}
          <div className={`border-t ${dividerClasses}`} />

          {/* Saved Notes List - Bottom Half */}
          <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <h3 className={`text-sm font-medium ${textClasses} mb-3`}>Previous Notes</h3>
            {notes.length === 0 ? (
              <p className={`text-sm ${subtextClasses} text-center py-8`}>
                No notes yet. Create your first note above!
              </p>
            ) : (
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => toggleNoteExpansion(note.id)}
                    onMouseEnter={() => setHoveredNoteId(note.id)}
                    onMouseLeave={() => setHoveredNoteId(null)}
                    className={`
                      p-3 rounded-lg border cursor-pointer
                      transition-all duration-150 relative
                      ${noteItemClasses}
                      ${expandedNoteId === note.id ? 'ring-2 ring-primary-500' : ''}
                    `}
                  >
                    {/* Delete button */}
                    {hoveredNoteId === note.id && (
                      <button
                        onClick={(e) => handleDeleteNote(note.id, e)}
                        className={`
                          absolute top-2 right-2 p-1 rounded
                          hover:bg-neutral-200 dark:hover:bg-primary-600
                          transition-all duration-150
                        `}
                        aria-label="Delete note"
                      >
                        <XMarkIcon className={`w-4 h-4 ${iconClasses}`} />
                      </button>
                    )}
                    
                    <h4 className={`text-sm font-medium ${textClasses} mb-1 pr-6`}>
                      {note.title}
                    </h4>
                    <div className={`flex items-center gap-1 text-xs ${timestampClasses} mb-2`}>
                      <ClockIcon className="w-3 h-3" />
                      {formatTimestamp(note.timestamp)}
                    </div>
                    <p className={`text-xs ${subtextClasses} ${expandedNoteId === note.id ? '' : 'line-clamp-1'}`}>
                      {expandedNoteId === note.id ? note.content : truncateText(note.content)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      <UserPreferencesModal
        isOpen={isUserPreferencesModalOpen}
        onClose={() => setIsUserPreferencesModalOpen(false)}
      />
    </>
  );
}
