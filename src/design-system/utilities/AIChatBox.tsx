'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { 
  XMarkIcon, 
  ChevronDownIcon, 
  PaperAirplaneIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Props interface for parent component usage
export interface AIChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  initialMessages?: Message[];
  placeholder?: string;
  title?: string;
  subtitle?: string;
}

// Message interface
export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AIChatBox({
  isOpen,
  onClose,
  onMinimize,
  initialMessages = [],
  placeholder = "Ask anything about your supply chain...",
  title = "IRIS",
}: AIChatBoxProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State management
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs for auto-scroll and textarea auto-resize
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`; // max 4 rows
    }
  }, [inputValue]);

  // Handle minimize
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimize) {
      onMinimize();
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // TODO: Replace with actual AI service integration
    // Example integration points:
    // - Call AI service API
    // - Handle WebSocket connections
    // - Add message persistence
    // - Add analytics tracking
    
    // Temporary mock response using setTimeout
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand you're asking about "${userMessage.content}". I'm here to help with your supply chain questions. This is a mock response - integrate with your AI service here.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // Simulate variable response time
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Theme-aware classes
  const chatWindowClasses = isDark
    ? 'bg-primary-900'
    : 'bg-white';

  const emptyStateIconClasses = isDark
    ? 'text-primary-400'
    : 'text-neutral-300';

  const emptyStateTextClasses = isDark
    ? 'text-primary-300'
    : 'text-neutral-500';

  const aiAvatarClasses = isDark
    ? 'bg-primary-700 text-primary-200'
    : 'bg-neutral-200 text-neutral-600';

  const aiMessageClasses = isDark
    ? 'bg-primary-800 text-primary-100'
    : 'bg-neutral-100 text-neutral-900';

  const timestampClasses = isDark
    ? 'text-primary-400'
    : 'text-neutral-400';

  const loadingAvatarClasses = isDark
    ? 'bg-primary-700 text-primary-200'
    : 'bg-neutral-200 text-neutral-600';

  const loadingMessageClasses = isDark
    ? 'bg-primary-800'
    : 'bg-neutral-100';

  const loadingDotsClasses = isDark
    ? 'bg-primary-400'
    : 'bg-neutral-400';

  const borderClasses = isDark
    ? 'border-primary-700'
    : 'border-neutral-200';

  const inputClasses = isDark
    ? 'bg-primary-800 border-primary-600 text-primary-100 placeholder-primary-400 focus-visible:ring-primary-400'
    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus-visible:ring-primary-400';

  const helpTextClasses = isDark
    ? 'text-primary-400'
    : 'text-neutral-500';

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for click outside to close */}
      <div 
        className="fixed inset-0 bg-transparent z-40"
        onClick={onClose}
      />
      
      {/* Chat Window */}
      <div 
        className={`
          fixed z-50 transition-all duration-300 ease-out
          ${isMinimized 
            ? 'bottom-4 left-20 w-80 h-14' 
            : 'bottom-4 left-20 w-[600px] h-[420px] md:w-[600px] md:h-[420px] lg:left-20 xl:left-20'
          }
          max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full max-md:h-full
          max-lg:left-3 max-lg:w-[480px]
          rounded-lg md:rounded-xl shadow-2xl
          ${chatWindowClasses}
          ${isOpen 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-4 opacity-0 pointer-events-none'
          }
        `}
        style={{ 
          filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary-600 text-neutral-50 px-4 py-3 rounded-t-lg md:rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <h3 className="font-semibold text-sm">{title}</h3>
                <span className="text-xs text-primary-100 opacity-90">- Infrastructure Resource Intelligence System</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={handleMinimize}
              className="p-1.5 hover:bg-primary-500 rounded-md transition-colors duration-150"
              aria-label="Minimize chat"
            >
              <ChevronDownIcon 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMinimized ? 'rotate-180' : ''
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-primary-500 rounded-md transition-colors duration-150"
              aria-label="Close chat"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content - only show when not minimized */}
        {!isMinimized && (
          <>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(420px-120px)] max-lg:h-[calc(420px-120px)] max-md:h-[calc(100vh-120px)]">
              {messages.length === 0 && (
                <div className="text-center py-14">
                  <SparklesIcon className={`w-10 h-10 mx-auto mb-3 ${emptyStateIconClasses}`} />
                  <p className={`text-sm ${emptyStateTextClasses}`}>
                    What can I help you with today?
                  </p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%]`}>
                    {message.type === 'ai' && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${aiAvatarClasses}`}>
                        <SparklesIcon className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div>
                      <div
                        className={`
                          px-3 py-2 rounded-lg text-sm
                          ${message.type === 'user'
                            ? 'bg-primary-600 text-neutral-50'
                            : aiMessageClasses
                          }
                        `}
                      >
                        {message.content}
                      </div>
                      <p className={`text-xs mt-1 px-1 ${timestampClasses}`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <UserIcon className="w-4 h-4 text-neutral-50" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${loadingAvatarClasses}`}>
                      <SparklesIcon className="w-4 h-4" />
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${loadingMessageClasses}`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${loadingDotsClasses}`}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${loadingDotsClasses}`} style={{ animationDelay: '0.1s' }}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${loadingDotsClasses}`} style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className={`border-t p-3 ${borderClasses}`}>
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={`
                      w-full px-3 py-2 border rounded-lg 
                      focus:outline-none focus-visible:ring-1 focus:border-transparent
                      resize-none text-sm
                      max-h-24 min-h-[40px]
                      ${inputClasses}
                    `}
                    rows={1}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="
                    h-[40px] w-[40px] bg-success-500 text-neutral-50 rounded-lg
                    hover:bg-success-700 disabled:bg-success-500/60 disabled:cursor-not-allowed
                    transition-colors duration-150 flex-shrink-0 flex items-center justify-center
                  "
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
              <p className={`text-xs mt-2 ${helpTextClasses}`}>
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
