# Form Components

Form components provide interactive elements for user input and actions. All form components are theme-aware and include comprehensive accessibility support.

## 🔘 Button

A versatile button component with multiple variants, sizes, and states.

### Import

```tsx
import { Button } from '@your-org/design-system';
```

### Props

```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant (appearance) */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names to apply */
  className?: string;
  /** Button content */
  children: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Show loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Icon to show before text */
  leftIcon?: React.ReactNode;
  /** Icon to show after text */
  rightIcon?: React.ReactNode;
}
```

### Usage Examples

#### Basic Usage

```tsx
<Button>Default Button</Button>

<Button variant="primary">Primary Action</Button>

<Button variant="secondary">Secondary Action</Button>

<Button variant="outline">Outline Button</Button>

<Button variant="ghost">Ghost Button</Button>

<Button variant="danger">Dangerous Action</Button>
```

#### Sizes

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

#### With Icons

```tsx
import { PlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

<Button leftIcon={<PlusIcon className="w-4 h-4" />}>
  Add Item
</Button>

<Button rightIcon={<ArrowRightIcon className="w-4 h-4" />}>
  Continue
</Button>
```

#### States

```tsx
{/* Loading state */}
<Button isLoading>
  Saving...
</Button>

{/* Disabled state */}
<Button disabled>
  Disabled Button
</Button>

{/* Full width */}
<Button fullWidth>
  Full Width Button
</Button>
```

#### Custom Styling

```tsx
<Button 
  variant="primary"
  className="shadow-lg hover:shadow-xl"
>
  Custom Styled Button
</Button>
```

### Theme Variants

The button automatically adapts to light/dark themes:

**Light Theme:**
- Primary: Blue background with white text
- Secondary: Light gray background with dark text
- Outline: Blue border with blue text
- Ghost: Transparent background with blue text
- Danger: Red background with white text

**Dark Theme:**
- Primary: Blue background with white text
- Secondary: Dark gray background with light text
- Outline: Blue border with light blue text
- Ghost: Transparent background with light blue text
- Danger: Red background with white text

---

## 📝 Input

A flexible input component for text, email, password, and other input types.

### Import

```tsx
import { Input } from '@your-org/design-system';
```

### Props

```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Input label */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below input */
  helperText?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
  /** Additional classes for the container */
  containerClassName?: string;
  /** Additional classes for the input */
  inputClassName?: string;
}
```

### Usage Examples

#### Basic Usage

```tsx
<Input 
  label="Email Address"
  type="email"
  placeholder="Enter your email"
/>

<Input 
  label="Password"
  type="password"
  placeholder="Enter your password"
  required
/>
```

#### With Helper Text

```tsx
<Input 
  label="Username"
  helperText="Must be at least 3 characters long"
  placeholder="Choose a username"
/>
```

#### Error State

```tsx
<Input 
  label="Email"
  error="Please enter a valid email address"
  value="invalid-email"
/>
```

#### With Icons

```tsx
import { EnvelopeIcon, EyeIcon } from '@heroicons/react/24/outline';

<Input 
  label="Email"
  leftIcon={<EnvelopeIcon className="w-5 h-5" />}
  placeholder="Enter your email"
/>

<Input 
  label="Password"
  type="password"
  rightIcon={<EyeIcon className="w-5 h-5 cursor-pointer" />}
  placeholder="Enter your password"
/>
```

#### Sizes

```tsx
<Input size="sm" label="Small Input" />
<Input size="md" label="Medium Input" />
<Input size="lg" label="Large Input" />
```

#### Controlled Component

```tsx
const [value, setValue] = useState('');

<Input 
  label="Controlled Input"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

## 📋 Select

A dropdown select component with search functionality and custom styling.

### Import

```tsx
import { Select } from '@your-org/design-system';
```

### Props

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  /** Select options */
  options: SelectOption[];
  /** Current selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Select label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the select is required */
  required?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is searchable */
  searchable?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional classes for container */
  containerClassName?: string;
}
```

### Usage Examples

#### Basic Usage

```tsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<Select 
  label="Choose an option"
  options={options}
  placeholder="Select an option"
  onChange={(value) => console.log(value)}
/>
```

#### With Default Value

```tsx
<Select 
  label="Priority"
  options={[
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
  ]}
  value="medium"
  onChange={(value) => console.log(value)}
/>
```

#### Searchable Select

```tsx
<Select 
  label="Country"
  options={countryOptions}
  searchable
  placeholder="Search and select a country"
  onChange={(value) => console.log(value)}
/>
```

#### With Error

```tsx
<Select 
  label="Required Field"
  options={options}
  error="Please select an option"
  required
/>
```

#### Disabled State

```tsx
<Select 
  label="Disabled Select"
  options={options}
  disabled
/>

{/* Or disable specific options */}
const optionsWithDisabled = [
  { value: 'option1', label: 'Available Option' },
  { value: 'option2', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Another Available Option' },
];
```

#### Controlled Component

```tsx
const [selectedValue, setSelectedValue] = useState('');

<Select 
  label="Controlled Select"
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>
```

## 🎯 Form Patterns

### Form Layout

```tsx
<form className="space-y-6">
  <Input 
    label="First Name"
    required
    placeholder="Enter your first name"
  />
  
  <Input 
    label="Last Name"
    required
    placeholder="Enter your last name"
  />
  
  <Input 
    label="Email"
    type="email"
    required
    placeholder="Enter your email"
  />
  
  <Select 
    label="Department"
    options={departmentOptions}
    required
    placeholder="Select your department"
  />
  
  <div className="flex gap-4">
    <Button variant="outline" fullWidth>
      Cancel
    </Button>
    <Button variant="primary" type="submit" fullWidth>
      Submit
    </Button>
  </div>
</form>
```

### Form Validation

```tsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
  department: ''
});

const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email';
  }
  
  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

return (
  <form onSubmit={handleSubmit}>
    <Input 
      label="Email"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({...formData, email: e.target.value})}
      error={errors.email}
      required
    />
    
    <Input 
      label="Password"
      type="password"
      value={formData.password}
      onChange={(e) => setFormData({...formData, password: e.target.value})}
      error={errors.password}
      required
    />
    
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </form>
);
```

## ♿ Accessibility

All form components include:
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Error state announcements
- Required field indicators

## 🎨 Theming

Form components automatically adapt to the current theme:
- Input borders and backgrounds adjust for light/dark modes
- Button variants maintain appropriate contrast
- Focus states are theme-aware
- Error states use semantic colors

## 🔧 Customization

Components accept additional className props for customization while maintaining accessibility and theme compatibility:

```tsx
<Button 
  variant="primary"
  className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
>
  Enhanced Button
</Button>

<Input 
  label="Custom Input"
  inputClassName="border-2 border-primary-500"
  containerClassName="max-w-md"
/>
``` 