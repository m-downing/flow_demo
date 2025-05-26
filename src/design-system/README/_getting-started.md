# Getting Started Guide

A practical guide to implementing and using the design system in your applications. This guide covers installation, setup, common patterns, and best practices for developers.

## 🚀 Installation & Setup

### Package Installation

```bash
# Using npm
npm install @your-org/design-system

# Using yarn
yarn add @your-org/design-system

# Using pnpm
pnpm add @your-org/design-system
```

### Peer Dependencies

Ensure you have the required peer dependencies installed:

```bash
npm install react react-dom @types/react @types/react-dom
```

### CSS Setup

Import the design system styles in your main CSS file or root component:

```css
/* In your main CSS file (e.g., globals.css) */
@import '@your-org/design-system/styles';

/* If using Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### TypeScript Configuration

Update your `tsconfig.json` to include proper paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@your-org/design-system": ["node_modules/@your-org/design-system"],
      "@your-org/design-system/*": ["node_modules/@your-org/design-system/*"]
    }
  }
}
```

## 🎯 Basic Implementation

### 1. Theme Provider Setup

Wrap your application with the ThemeProvider to enable theming:

```tsx
// App.tsx
import React from 'react';
import { ThemeProvider } from '@your-org/design-system';
import { YourAppComponent } from './components';

function App() {
  return (
    <ThemeProvider>
      <YourAppComponent />
    </ThemeProvider>
  );
}

export default App;
```

### 2. Your First Components

Start with basic components to get familiar with the API:

```tsx
// components/WelcomePage.tsx
import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Input, 
  Badge,
  LightDarkModeToggle 
} from '@your-org/design-system';

export function WelcomePage() {
  const [name, setName] = useState('');

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Welcome!</h1>
          <LightDarkModeToggle />
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <Button variant="primary" fullWidth>
            Get Started
          </Button>
          
          {name && (
            <div className="text-center">
              <Badge variant="success">Hello, {name}!</Badge>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
```

## 🏗️ Common Implementation Patterns

### Form Handling

```tsx
import React, { useState } from 'react';
import { Button, Input, Select, Textarea } from '@your-org/design-system';

interface FormData {
  name: string;
  email: string;
  role: string;
  bio: string;
}

export function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '',
    bio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Your form submission logic
      await submitForm(formData);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => updateField('name')(e.target.value)}
          placeholder="Full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email')(e.target.value)}
          placeholder="email@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <Select
          value={formData.role}
          onChange={updateField('role')}
          options={[
            { value: 'admin', label: 'Administrator' },
            { value: 'user', label: 'User' },
            { value: 'viewer', label: 'Viewer' }
          ]}
          placeholder="Select role"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <Textarea
          value={formData.bio}
          onChange={(e) => updateField('bio')(e.target.value)}
          placeholder="Tell us about yourself"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        loading={isSubmitting}
        disabled={!formData.name || !formData.email}
        fullWidth
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

### Data Table Implementation

```tsx
import React, { useState, useEffect } from 'react';
import { DataTable, Button, Badge } from '@your-org/design-system';
import type { Column } from '@your-org/design-system';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // Define columns
  const columns: Column<User>[] = [
    {
      id: 'name',
      header: 'Name',
      accessor: 'name',
      sortable: true
    },
    {
      id: 'email',
      header: 'Email',
      accessor: 'email',
      sortable: true
    },
    {
      id: 'role',
      header: 'Role',
      accessor: 'role',
      cell: (value) => (
        <Badge variant="outline">{value}</Badge>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      cell: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'error'}>
          {value}
        </Badge>
      )
    },
    {
      id: 'lastLogin',
      header: 'Last Login',
      accessor: 'lastLogin',
      sortable: true,
      cell: (value) => new Date(value).toLocaleDateString()
    },
    {
      id: 'actions',
      header: 'Actions',
      accessor: () => null,
      width: 120,
      cell: (_, row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => editUser(row.id)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="error"
            onClick={() => deleteUser(row.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  // Fetch data
  useEffect(() => {
    fetchUsers();
  }, [page, pageSize]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.getUsers({ page, pageSize });
      setUsers(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const editUser = (id: string) => {
    console.log('Edit user:', id);
  };

  const deleteUser = (id: string) => {
    console.log('Delete user:', id);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button variant="primary">Add User</Button>
      </div>

      <DataTable
        data={users}
        columns={columns}
        loading={loading}
        pagination={{
          page,
          pageSize,
          total,
          onPageChange: setPage,
          onPageSizeChange: setPageSize
        }}
        emptyState={{
          title: 'No users found',
          description: 'Get started by adding your first user.',
          action: <Button variant="primary">Add User</Button>
        }}
      />
    </div>
  );
}
```

### Modal Usage Patterns

```tsx
import React, { useState } from 'react';
import { Modal, Button, Input } from '@your-org/design-system';

export function UserActions() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-x-2">
      <Button 
        variant="primary" 
        onClick={() => setShowEditModal(true)}
      >
        Edit User
      </Button>
      
      <Button 
        variant="error" 
        onClick={() => setShowDeleteModal(true)}
      >
        Delete User
      </Button>

      {/* Edit Modal */}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
        footer={
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        size="sm"
        footer={
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="error" 
              onClick={handleDelete}
              loading={isDeleting}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
```

## 🎨 Styling and Customization

### Using Design Tokens

```tsx
import React from 'react';
import { colors, spacing, typography } from '@your-org/design-system/tokens';

// Custom styled component using tokens
const CustomCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray[200]}`,
        borderRadius: '8px',
        padding: spacing[6],
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        fontFamily: typography.fontFamily.sans.join(', ')
      }}
    >
      {children}
    </div>
  );
};
```

### Extending Components with Tailwind

```tsx
import React from 'react';
import { Button, Card } from '@your-org/design-system';

export function CustomStyledComponents() {
  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <h3 className="text-lg font-semibold mb-4">Custom Styled Card</h3>
      
      <Button 
        variant="primary"
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
      >
        Gradient Button
      </Button>
    </Card>
  );
}
```

## 🔧 Advanced Patterns

### Theme-Aware Components

```tsx
import React from 'react';
import { useTheme } from '@your-org/design-system';

export function ThemeAwareComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="p-4">
      <div className="mb-4">
        <p>Current theme: {resolvedTheme}</p>
        <p>Theme setting: {theme}</p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setTheme('light')}
          className={`px-3 py-1 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className={`px-3 py-1 rounded ${theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          System
        </button>
      </div>
    </div>
  );
}
```

### Custom Hook for Form State

```tsx
import { useState, useCallback } from 'react';

export function useFormState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setState(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const setFieldError = useCallback(<K extends keyof T>(field: K, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    setErrors({});
  }, [initialState]);

  return {
    state,
    errors,
    updateField,
    setFieldError,
    reset,
    hasErrors: Object.values(errors).some(error => error)
  };
}

// Usage
function ContactForm() {
  const {
    state,
    errors,
    updateField,
    setFieldError,
    reset,
    hasErrors
  } = useFormState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!state.name) {
      setFieldError('name', 'Name is required');
      return;
    }
    
    // Submit logic...
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={state.name}
        onChange={(e) => updateField('name', e.target.value)}
        error={errors.name}
        label="Name"
      />
      {/* ... other fields */}
    </form>
  );
}
```

## 📱 Responsive Implementation

### Mobile-First Approach

```tsx
import React from 'react';
import { Button, Card } from '@your-org/design-system';

export function ResponsiveLayout() {
  return (
    <div className="container mx-auto px-4">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Main Content
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Content that adapts to screen size
          </p>
        </Card>
        
        <aside className="lg:w-80">
          <Card>
            <h3 className="font-medium mb-3">Sidebar</h3>
            <Button 
              variant="primary" 
              fullWidth
              size="sm"
              className="md:size-md"
            >
              Action
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}
```

## 🐛 Common Issues & Solutions

### Issue: Components not styled correctly

**Solution:** Ensure CSS is imported and Tailwind is configured:

```tsx
// Make sure this is in your main CSS file
@import '@your-org/design-system/styles';

// Or import in your root component
import '@your-org/design-system/styles';
```

### Issue: Theme not working

**Solution:** Wrap your app with ThemeProvider:

```tsx
import { ThemeProvider } from '@your-org/design-system';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Issue: TypeScript errors with component props

**Solution:** Import types explicitly:

```tsx
import type { ButtonProps, Column } from '@your-org/design-system';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}
```

## ✅ Best Practices Checklist

- [ ] **Theme Provider**: Wrap your app with ThemeProvider
- [ ] **Import Styles**: Import design system CSS
- [ ] **Use TypeScript**: Leverage type safety for better DX
- [ ] **Design Tokens**: Use tokens instead of hardcoded values
- [ ] **Accessibility**: Test with screen readers and keyboard navigation
- [ ] **Responsive**: Test components on different screen sizes
- [ ] **Performance**: Import only components you need
- [ ] **Testing**: Test theme switching and component states
- [ ] **Documentation**: Document custom implementations

## 🔗 Next Steps

1. **Explore Components**: Check individual component documentation
2. **Customize Theme**: Create your own theme variants
3. **Build Patterns**: Develop reusable component patterns
4. **Contribute**: Share improvements with the team

For detailed component APIs and advanced usage, refer to the specific documentation files:
- [Forms](./forms.md) - Form components and patterns
- [Display](./display.md) - Data display components (tabular data / lists)
- [Layout](./layout.md) - Layout and structural components
- [Overlays](./overlays.md) - Modal and overlay components
- [Utilities](./utilities.md) - Utility components and helpers 