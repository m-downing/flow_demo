'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, PlusIcon, ClockIcon, XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useNotifications } from '@/app/contexts/NotificationContext';
import NotificationBadge from '@/design-system/components/feedback/NotificationBadge';
import NotificationsModal from '@/design-system/overlays/modals/Notifications';
import UserPreferencesModal from '@/design-system/overlays/modals/UserPreferences';

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
      const notesWithDates = parsedNotes.map((note: Note & { timestamp: string }) => ({
        ...note,
        timestamp: new Date(note.timestamp)
      }));
      setNotes(notesWithDates);
    }
  }, []);

  // Handle click outside to close drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close drawer if a modal is open
      if (isNotificationsModalOpen || isUserPreferencesModalOpen) {
        return;
      }
      
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
  }, [isOpen, isNotificationsModalOpen, isUserPreferencesModalOpen]);

  const handleNotificationsClick = () => {
    // Close preferences modal if open
    setIsUserPreferencesModalOpen(false);
    setIsNotificationsModalOpen(true);
  };

  const handlePreferencesClick = () => {
    // Close notifications modal if open
    setIsNotificationsModalOpen(false);
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
    ? 'bg-gradient-to-br from-neutral-900 to-neutral-800 border-neutral-700'
    : 'bg-gradient-to-br from-white to-neutral-50 border-neutral-200';

  const tabClasses = isDark
    ? 'bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-neutral-700 hover:to-neutral-600 border-neutral-600 shadow-lg'
    : 'bg-gradient-to-r from-white to-neutral-50 hover:from-neutral-50 hover:to-neutral-100 border-neutral-300 shadow-lg';

  const textClasses = isDark
    ? 'text-neutral-100'
    : 'text-neutral-900';

  const subtextClasses = isDark
    ? 'text-neutral-400'
    : 'text-neutral-600';

  const dividerClasses = isDark 
    ? 'border-neutral-700'
    : 'border-neutral-200';

  const iconClasses = isDark
    ? 'text-neutral-300'
    : 'text-neutral-600';

  const inputClasses = isDark
    ? 'bg-neutral-800/50 backdrop-blur border-neutral-600 text-neutral-100 placeholder-neutral-500 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400/20 shadow-inner'
    : 'bg-white/70 backdrop-blur border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 shadow-sm';

  const buttonClasses = isDark
    ? 'bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 text-neutral-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
    : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5';

  const noteItemClasses = isDark
    ? 'bg-gradient-to-br from-neutral-800 to-neutral-750 hover:from-neutral-750 hover:to-neutral-700 border-neutral-700 shadow-md hover:shadow-lg'
    : 'bg-gradient-to-br from-white to-neutral-50 hover:from-neutral-50 hover:to-neutral-100 border-neutral-200 shadow-sm hover:shadow-md';

  const timestampClasses = isDark
    ? 'text-neutral-500'
    : 'text-neutral-400';

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
              relative
              flex items-center justify-center
              w-8 h-14 rounded-l-xl border border-r-0
              transition-all duration-300
              hover:w-9
              overflow-visible
              ${tabClasses}
            `}
            aria-label="Open drawer"
          >
            <ChevronLeftIcon className={`w-5 h-5 ${iconClasses} transition-all duration-300`} />
            <NotificationBadge count={unreadCount} variant="sm" className="absolute -top-1.5 -left-1.5 z-10" />
          </button>
        </div>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`
          fixed top-0 right-0 h-full w-[500px] z-[60]
          transform transition-all duration-500 ease-out
          ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}
          ${drawerClasses}
          border-l flex flex-col
        `}
      >
        {/* Header */}
        <div className={`p-6 border-b ${dividerClasses} flex-shrink-0 relative overflow-hidden`}>
          {/* Background gradient overlay for subtle shine effect */}
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01]' 
              : 'bg-gradient-to-br from-white/40 via-transparent to-white/20'
          }`} />
          
          <div className="flex items-center justify-between relative z-10">
            {/* Preferences text */}
            <div 
              className="cursor-pointer group"
              onClick={handlePreferencesClick}
            >
              <h2 className={`text-xl font-semibold ${textClasses} ${isDark ? 'group-hover:text-neutral-400' : 'group-hover:text-primary-600'} transition-colors duration-200`}>Preferences</h2>
              <p className={`text-sm ${subtextClasses} mt-0.5 flex items-center gap-1.5`}>
                <Cog6ToothIcon className="w-4 h-4" />
                Manage your account settings
              </p>
            </div>
            
            {/* User Profile Icon */}
            <div className="relative">
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center cursor-pointer 
                  transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105
                  ${isDark 
                    ? 'bg-gradient-to-br from-neutral-600 to-neutral-700 hover:from-neutral-500 hover:to-neutral-600' 
                    : 'bg-gradient-to-br from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700'
                  }
                `}
                onClick={handleNotificationsClick}
              >
                <UserIcon className="w-7 h-7 text-white" />
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
                  w-full px-4 py-3 pr-10 text-sm border rounded-md
                  focus:outline-none transition-all duration-200
                  ${inputClasses}
                `}
              />
              {(noteTitle || noteContent) && (
                <button
                  onClick={handleClearForm}
                  className={`absolute right-3 top-3 p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200`}
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
                w-full px-4 py-3 text-sm border rounded-md
                focus:outline-none transition-all duration-200
                resize-none h-48
                ${inputClasses}
              `}
            />
            <button
              onClick={handleSaveNote}
              disabled={!noteTitle.trim() || !noteContent.trim()}
              className={`
                w-full px-4 py-3 text-sm font-medium rounded-md
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                flex items-center justify-center gap-2
                ${buttonClasses}
              `}
            >
              <PlusIcon className="w-4 h-4" />
              Save Note
            </button>
          </div>

          {/* Divider with gradient */}
          <div className={`h-px ${isDark ? 'bg-gradient-to-r from-transparent via-neutral-600 to-transparent' : 'bg-gradient-to-r from-transparent via-neutral-300 to-transparent'}`} />

          {/* Saved Notes List - Bottom Half */}
          <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-semibold ${textClasses} uppercase tracking-wider`}>Previous Notes</h3>
              {notes.length > 0 && (
                <span className={`text-xs ${subtextClasses} bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded-full`}>
                  {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                </span>
              )}
            </div>
            {notes.length === 0 ? (
              <div className="text-center py-12">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} flex items-center justify-center`}>
                  <ClockIcon className={`w-10 h-10 ${subtextClasses}`} />
                </div>
                <p className={`text-sm ${subtextClasses}`}>
                  No notes yet. Create your first note above!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => toggleNoteExpansion(note.id)}
                    onMouseEnter={() => setHoveredNoteId(note.id)}
                    onMouseLeave={() => setHoveredNoteId(null)}
                    className={`
                      p-4 rounded-xl border cursor-pointer
                      transition-all duration-300 relative
                      transform hover:-translate-y-1
                      ${noteItemClasses}
                      ${expandedNoteId === note.id ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}
                    `}
                  >
                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className={`
                        absolute top-3 right-3 p-1.5 rounded-lg
                        ${hoveredNoteId === note.id ? 'opacity-100' : 'opacity-0'}
                        hover:bg-error-50 dark:hover:bg-error-500/20
                        transition-all duration-200
                      `}
                      aria-label="Delete note"
                    >
                      <XMarkIcon className={`w-4 h-4 hover:text-error-500 dark:hover:text-error-300 ${iconClasses}`} />
                    </button>
                    
                    <h4 className={`text-sm font-semibold ${textClasses} mb-2 pr-8`}>
                      {note.title}
                    </h4>
                    <div className={`flex items-center gap-1.5 text-xs ${timestampClasses} mb-3`}>
                      <ClockIcon className="w-3.5 h-3.5" />
                      {formatTimestamp(note.timestamp)}
                    </div>
                    <p className={`text-xs ${subtextClasses} leading-relaxed ${expandedNoteId === note.id ? '' : 'line-clamp-2'}`}>
                      {expandedNoteId === note.id ? note.content : truncateText(note.content)}
                    </p>
                    {expandedNoteId !== note.id && note.content.length > 80 && (
                      <p className={`text-xs ${isDark ? 'text-primary-400' : 'text-primary-600'} mt-2 font-medium`}>
                        Click to expand...
                      </p>
                    )}
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
