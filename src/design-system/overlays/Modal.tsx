import React, { useEffect, useCallback, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../app/contexts/ThemeContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Modal sizes
 */
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Modal component props
 * @interface ModalProps
 */
interface ModalProps {
  /** Modal title */
  title?: ReactNode;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** Modal content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Modal size */
  size?: ModalSize;
  /** Whether to center modal content vertically */
  centered?: boolean;
  /** Additional class for modal content */
  contentClassName?: string;
  /** Modal description for screen readers */
  description?: string;
}

// Component to only render on client-side
const ClientOnlyPortal: React.FC<{children: ReactNode}> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted ? createPortal(children, document.body) : null;
};

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md',
  centered = false,
  contentClassName = '',
  description,
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check for client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // First stage of mounting
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
      
      // Second stage - show content with delay
      const visibilityTimer = setTimeout(() => {
        setIsContentVisible(true);
      }, 50); 
      
      return () => clearTimeout(visibilityTimer);
    }, 20);
    
    return () => clearTimeout(mountTimer);
  }, [isClient]);

  const isDark = theme === 'dark';

  // Handle escape key press
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Set up event listeners
  useEffect(() => {
    if (!isClient || !isOpen) return;
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Focus trap inside modal
    const previousActiveElement = document.activeElement as HTMLElement;
    
    return () => {
      // Cleanup event listeners
      document.removeEventListener('keydown', handleEscapeKey);
      // Restore body scrolling
      document.body.style.overflow = '';
      // Restore focus
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, handleEscapeKey, isClient]);
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  // Theme-aware classes
  const modalBackgroundClasses = isDark
    ? 'bg-primary-900'
    : 'bg-white';

  const borderClasses = isDark
    ? 'border-primary-700'
    : 'border-neutral-200';

  const titleTextClasses = isDark
    ? 'text-primary-100'
    : 'text-neutral-900';

  const descriptionTextClasses = isDark
    ? 'text-primary-300'
    : 'text-neutral-500';

  const closeButtonClasses = isDark
    ? 'text-primary-400 hover:text-primary-200 focus-visible:ring-primary-400'
    : 'text-neutral-400 hover:text-neutral-900 focus-visible:ring-primary-600';

  const footerClasses = isDark
    ? 'bg-primary-800 border-primary-700'
    : 'bg-neutral-50 border-neutral-200';
  
  // Don't render anything if not open or if not client-side
  if (!isOpen || !isClient) return null;
  
  // Use our custom ClientOnlyPortal instead of createPortal directly
  return (
    <ClientOnlyPortal>
      <div 
        className="fixed inset-0 z-50 flex overflow-y-auto"
        style={{ 
          alignItems: centered ? 'center' : 'flex-start',
          visibility: isMounted ? 'visible' : 'hidden'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        key={`modal-${theme}-${isMounted}-${isContentVisible}`}
      >
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-neutral-900 bg-opacity-50 transition-opacity"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
          style={{ 
            opacity: isContentVisible ? 1 : 0, 
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
        
        {/* Modal panel */}
        <div 
          className={`
            relative
            mx-auto
            my-8
            w-full
            rounded-md
            shadow-xl
            transition-all
            ${modalBackgroundClasses}
            ${sizeClasses[size]}
            ${contentClassName}
          `}
          onClick={(e) => e.stopPropagation()}
          style={{ 
            opacity: isContentVisible ? 1 : 0, 
            transition: 'opacity 0.3s ease-in-out',
            transform: `scale(${isContentVisible ? 1 : 0.98})`,
            visibility: isMounted ? 'visible' : 'hidden'
          }}
        >
          {/* Close button */}
          <button
            type="button"
            className={`absolute right-4 top-4 focus:outline-none focus-visible:ring-2 ${closeButtonClasses}`}
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          
          {/* Modal header */}
          {title && (
            <div className={`px-6 py-4 border-b ${borderClasses}`}>
              <h3 id="modal-title" className={`text-lg font-medium ${titleTextClasses}`}>
                {title}
              </h3>
              {description && (
                <p id="modal-description" className={`mt-1 text-sm ${descriptionTextClasses}`}>
                  {description}
                </p>
              )}
            </div>
          )}
          
          {/* Modal body */}
          <div className={`px-6 py-4 ${!title ? 'pt-8' : ''} ${!footer ? 'pb-6' : ''}`}>
            {isContentVisible ? children : null}
          </div>
          
          {/* Modal footer */}
          {footer && (
            <div className={`px-6 py-4 border-t rounded-b-md ${footerClasses}`}>
              {isContentVisible ? footer : null}
            </div>
          )}
        </div>
      </div>
    </ClientOnlyPortal>
  );
};

export default Modal; 