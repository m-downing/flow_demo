import React from 'react';
import Modal from '@/design-system/overlays/Modal';
import Button from '@/design-system/components/primitives/Button';
import { AlertItem } from './types';
import { PhoneIcon, EnvelopeIcon, PaperClipIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: AlertItem | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, alert }) => {
  if (!alert) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${alert.sctId}: ${alert.message}`}
      size="lg"
      footer={
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" size="sm" onClick={onClose}>
            <div className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2" />
              Mark Issue as Resolved
            </div>
          </Button>
          <Button variant="primary" size="sm">Send</Button>
        </div>
      }
    >
      <div className="space-y-md">
        {/* Collapsible Contact Information Section */}
        <div className="border border-neutral-200 dark:border-neutral-600 rounded-lg overflow-hidden">
          <div 
            className="bg-neutral-50 dark:bg-neutral-700 p-sm flex justify-between items-center cursor-pointer"
            onClick={() => {
              const contactsEl = document.getElementById('contacts-section');
              if (contactsEl) {
                contactsEl.classList.toggle('hidden');
              }
            }}
          >
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-50">Key Contacts ({alert.contacts.length})</h4>
            <EnvelopeIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          </div>
          <div id="contacts-section" className="p-sm border-t border-neutral-200 dark:border-neutral-600 hidden">
            <div className="grid grid-cols-2 gap-md">
              {alert.contacts.map((contact, index) => (
                <div key={index} className="bg-white dark:bg-neutral-800 p-sm rounded border border-neutral-200 dark:border-neutral-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm text-neutral-900 dark:text-neutral-50">{contact.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{contact.role}</p>
                    </div>
                    <div className="flex gap-sm">
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="!p-1"
                        onClick={() => window.location.href = `mailto:${contact.email}`}
                      >
                        <EnvelopeIcon className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="!p-1"
                        onClick={() => window.location.href = `tel:${contact.phone}`}
                      >
                        <PhoneIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Issue Details */}
        <div className="bg-neutral-50 dark:bg-neutral-700 p-sm rounded-lg border border-neutral-200 dark:border-neutral-600">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Location</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">{alert.location}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Reported</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">{alert.timestamp}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Status</p>
              <p className={`text-sm font-medium ${
                alert.severity === 'critical' ? 'text-error-500 dark:text-error-300' : 
                alert.severity === 'warning' ? 'text-yellow-700 dark:text-yellow-500' : 
                'text-blue-700 dark:text-blue-100'
              }`}>
                {alert.severity.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Chat History */}
        <div className="border border-neutral-200 dark:border-neutral-600 rounded-lg">
          <div className="p-sm bg-neutral-50 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-50">Resolution Log</h4>
          </div>
          <div 
            className="p-sm max-h-60 overflow-y-auto scrollbar-hide bg-white dark:bg-neutral-800" 
            style={{ 
              minHeight: "240px"
            }}
          >
            {/* Example messages - you can replace with actual data */}
            <div className="mb-sm">
              <div className="flex items-start gap-sm">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-100">
                    {alert.contacts[0]?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{alert.contacts[0]?.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{new Date().toLocaleTimeString()}</p>
                  </div>
                  <div className="mt-xs p-sm bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                    <p className="text-sm text-neutral-900 dark:text-neutral-50">Initial assessment: {alert.message}. Investigating root cause.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-sm">
              <div className="flex items-start gap-sm">
                <div className="rounded-full bg-neutral-100 dark:bg-neutral-700 w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">ME</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">You</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{new Date(Date.now() - 300000).toLocaleTimeString()}</p>
                  </div>
                  <div className="mt-xs p-sm bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                    <p className="text-sm text-neutral-900 dark:text-neutral-50">What&apos;s the current impact on operations?</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-sm">
              <div className="flex items-start gap-sm">
                <div className="rounded-full bg-green-50 dark:bg-green-700 w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-green-700 dark:text-green-50">
                    {alert.contacts[1]?.name.split(' ').map(n => n[0]).join('') || 'BB'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{alert.contacts[1]?.name || 'Bob The Builder'}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{new Date(Date.now() - 240000).toLocaleTimeString()}</p>
                  </div>
                  <div className="mt-xs p-sm bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                    <p className="text-sm text-neutral-900 dark:text-neutral-50">Currently minimal impact. Redundant systems have kicked in. Load balancing is working as expected.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message Input */}
        <div className="p-sm border-t border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800">
          <div className="mb-sm">
            <input 
              type="text"
              placeholder="Type your message here..."
              className="w-full px-sm py-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400"
            />
          </div>
          <div className="flex gap-sm">
            <Button variant="ghost" size="sm" className="!p-1">
              <PaperClipIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="!p-1">
              <PhotoIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;