# Overlay Components

Overlay components provide contextual interfaces that appear above the main content, creating focused experiences for user interactions without losing context of the underlying page.

## 🪟 Modal

A flexible modal component that supports various sizes, animations, and content types while maintaining accessibility standards.

### Import

```tsx
import { Modal } from '@your-org/design-system';
```

### Props

```tsx
interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether modal can be closed by clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Whether modal can be closed by pressing escape */
  closeOnEscape?: boolean;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Whether to show default footer actions */
  showFooter?: boolean;
  /** Animation type */
  animation?: 'fade' | 'scale' | 'slide-up' | 'slide-down';
  /** Custom styling */
  className?: string;
  /** Z-index for modal */
  zIndex?: number;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
}
```

### Usage Examples

#### Basic Modal

```tsx
function BasicModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Modal"
      >
        <p>This is a basic modal with default settings.</p>
      </Modal>
    </>
  );
}
```

#### Different Sizes

```tsx
function SizedModalsExample() {
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);

  return (
    <div className="flex gap-2">
      <Button onClick={() => setModalSize('sm')}>Small</Button>
      <Button onClick={() => setModalSize('md')}>Medium</Button>
      <Button onClick={() => setModalSize('lg')}>Large</Button>
      <Button onClick={() => setModalSize('xl')}>Extra Large</Button>
      
      <Modal
        open={modalSize !== null}
        onClose={() => setModalSize(null)}
        title={`${modalSize?.toUpperCase()} Modal`}
        size={modalSize || 'md'}
      >
        <p>This modal is sized: {modalSize}</p>
      </Modal>
    </div>
  );
}
```

#### Modal with Custom Footer

```tsx
function CustomFooterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal with Actions
      </Button>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        footer={
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              loading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to save these changes?</p>
      </Modal>
    </>
  );
}
```

#### Form Modal

```tsx
function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsOpen(false);
    setFormData({ name: '', email: '', role: '' });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Add User
      </Button>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New User"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              form="user-form"
              variant="primary"
            >
              Add User
            </Button>
          </div>
        }
      >
        <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Role
            </label>
            <Select
              value={formData.role}
              onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              placeholder="Select role"
              options={[
                { value: 'admin', label: 'Administrator' },
                { value: 'user', label: 'User' },
                { value: 'viewer', label: 'Viewer' }
              ]}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
```

#### Confirmation Modal

```tsx
function ConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Action confirmed');
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        variant="error" 
        onClick={() => setIsOpen(true)}
      >
        Delete Item
      </Button>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Deletion"
        size="sm"
        animation="scale"
        footer={
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="error" 
              onClick={handleConfirm}
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
```

#### Multi-step Modal

```tsx
function MultiStepModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Start Setup
      </Button>
      
      <Modal
        open={isOpen}
        onClose={handleClose}
        title={`Setup - Step ${currentStep} of ${totalSteps}`}
        size="lg"
        closeOnOverlayClick={false}
        footer={
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleClose}
              >
                Cancel
              </Button>
              {currentStep < totalSteps ? (
                <Button 
                  variant="primary" 
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={handleClose}
                >
                  Finish
                </Button>
              )}
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Progress indicator */}
          <div className="flex justify-between mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div 
                key={i + 1}
                className={`flex items-center ${i < totalSteps - 1 ? 'flex-1' : ''}`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${i + 1 <= currentStep ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    i + 1 < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Basic Information</h3>
              <p>Enter your basic details to get started.</p>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Preferences</h3>
              <p>Configure your preferences and settings.</p>
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Review</h3>
              <p>Review your settings before finishing setup.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
```

#### Fullscreen Modal

```tsx
function FullscreenModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Fullscreen Modal
      </Button>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Fullscreen Modal"
        size="full"
        showCloseButton={true}
      >
        <div className="h-full p-6">
          <p className="text-lg mb-4">
            This modal takes up the entire viewport.
          </p>
          <p>Perfect for complex forms, detailed views, or immersive experiences.</p>
        </div>
      </Modal>
    </>
  );
}
```

## 🎈 Popover

A lightweight overlay component for displaying contextual information or simple interactions.

### Import

```tsx
import { Popover } from '@your-org/design-system';
```

### Props

```tsx
interface PopoverProps {
  /** Whether the popover is open */
  open: boolean;
  /** Function to call when popover should close */
  onClose: () => void;
  /** Element that triggers the popover */
  trigger: React.ReactNode;
  /** Popover content */
  children: React.ReactNode;
  /** Popover placement */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  /** Whether to show arrow */
  showArrow?: boolean;
  /** Custom styling */
  className?: string;
  /** Distance from trigger */
  offset?: number;
}
```

### Usage Examples

#### Basic Popover

```tsx
function BasicPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      open={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <Button onClick={() => setIsOpen(true)}>
          Show Info
        </Button>
      }
    >
      <div className="p-3">
        <p className="text-sm">This is a basic popover with some information.</p>
      </div>
    </Popover>
  );
}
```

#### User Profile Popover

```tsx
function UserProfilePopover({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      open={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      trigger={
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2"
        >
          <Avatar src={user.avatar} alt={user.name} size="sm" />
          <span className="text-sm font-medium">{user.name}</span>
        </button>
      }
    >
      <div className="w-64 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar src={user.avatar} alt={user.name} size="md" />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          {user.bio}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Message</Button>
          <Button size="sm" variant="primary">View Profile</Button>
        </div>
      </div>
    </Popover>
  );
}
```

## 🗨️ Tooltip

A simple overlay that provides additional information on hover or focus.

### Import

```tsx
import { Tooltip } from '@your-org/design-system';
```

### Props

```tsx
interface TooltipProps {
  /** Tooltip content */
  content: string | React.ReactNode;
  /** Element to attach tooltip to */
  children: React.ReactNode;
  /** Tooltip placement */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Custom styling */
  className?: string;
}
```

### Usage Examples

```tsx
// Basic tooltip
<Tooltip content="This button saves your changes">
  <Button>Save</Button>
</Tooltip>

// Rich tooltip content
<Tooltip 
  content={
    <div>
      <div className="font-medium">Pro Tip</div>
      <div className="text-sm">Use Cmd+S to save quickly</div>
    </div>
  }
  placement="top"
>
  <Button variant="outline">Save Document</Button>
</Tooltip>

// Tooltip with custom delay
<Tooltip 
  content="This action is irreversible" 
  delay={500}
  placement="top"
>
  <Button variant="error">Delete</Button>
</Tooltip>
```

## 🚨 Alert Dialog

A modal dialog specifically designed for important alerts and confirmations.

### Import

```tsx
import { AlertDialog } from '@your-org/design-system';
```

### Props

```tsx
interface AlertDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Function to call when dialog should close */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog description */
  description: string;
  /** Alert type */
  type?: 'info' | 'warning' | 'error' | 'success';
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button action */
  onConfirm?: () => void;
  /** Whether confirm action is loading */
  isConfirming?: boolean;
}
```

### Usage Examples

```tsx
function DeleteConfirmation() {
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItem();
      setShowAlert(false);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button 
        variant="error" 
        onClick={() => setShowAlert(true)}
      >
        Delete Item
      </Button>
      
      <AlertDialog
        open={showAlert}
        onClose={() => setShowAlert(false)}
        type="error"
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        isConfirming={isDeleting}
      />
    </>
  );
}
```

## ♿ Accessibility

Overlay components include comprehensive accessibility features:

### Modal
- **Focus Management**: Traps focus within modal, returns to trigger on close
- **ARIA Attributes**: Proper modal labeling and description
- **Keyboard Navigation**: Escape key to close, tab navigation within modal
- **Screen Reader Support**: Announces modal open/close states

### Popover
- **ARIA Relationships**: Links trigger and content with aria-describedby
- **Keyboard Support**: Escape key to close, focus management
- **Hover/Focus States**: Supports both mouse and keyboard interactions

### Tooltip
- **ARIA Labels**: Uses aria-describedby for screen reader support
- **Keyboard Accessible**: Shows on focus, hides on blur
- **Non-blocking**: Doesn't interfere with underlying interactions

```tsx
// Accessible modal example
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Accessible Modal"
  aria-label="User settings dialog"
  aria-describedby="modal-description"
>
  <p id="modal-description">
    Configure your user settings and preferences.
  </p>
</Modal>
```

## 🎨 Theming

Overlay components automatically adapt to the current theme:
- Modal backgrounds and borders use theme colors
- Popover styling inherits theme context
- Focus states and animations respect theme settings
- Z-index values are consistent across theme modes

## 🔧 Customization

Overlay components support extensive customization:

```tsx
// Custom styled modal
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Modal"
  className="backdrop-blur-sm"
  animation="slide-up"
  size="lg"
>
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
    <p>Custom styled content</p>
  </div>
</Modal>

// Custom popover styling
<Popover
  trigger={<Button>Custom Trigger</Button>}
  className="shadow-2xl border-2 border-primary-200"
  showArrow={true}
  offset={12}
>
  <div className="p-4 bg-gradient-to-r from-primary-50 to-blue-50">
    <p>Beautifully styled popover content</p>
  </div>
</Popover>
```

## 💡 Best Practices

1. **Modal Usage**: Use modals for focused tasks that require user attention
2. **Accessibility**: Always provide proper ARIA labels and manage focus
3. **Performance**: Lazy load modal content when possible
4. **UX**: Provide clear ways to close overlays (X button, escape key, overlay click)
5. **Mobile**: Ensure overlays work well on touch devices
6. **Content**: Keep overlay content concise and focused
7. **Stacking**: Be mindful of z-index when layering multiple overlays 