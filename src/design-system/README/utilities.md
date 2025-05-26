# Utility Components

Utility components provide specialized functionality and enhance user experience with interactive features and smart interfaces.

## 🤖 AIChatBox

An intelligent chat interface component that provides conversational AI interactions with customizable styling and behavior.

### Import

```tsx
import { AIChatBox } from '@your-org/design-system';
```

### Props

```tsx
interface AIChatBoxProps {
  /** Chat messages */
  messages: ChatMessage[];
  /** Function to handle new messages */
  onSendMessage: (message: string) => void;
  /** Whether AI is currently responding */
  isLoading?: boolean;
  /** Placeholder text for input */
  placeholder?: string;
  /** Welcome message configuration */
  welcomeMessage?: {
    title: string;
    subtitle?: string;
    suggestions?: string[];
  };
  /** Chat box title */
  title?: string;
  /** Whether to show avatar for AI */
  showAIAvatar?: boolean;
  /** Whether to show avatar for user */
  showUserAvatar?: boolean;
  /** Custom AI avatar */
  aiAvatar?: string;
  /** Custom user avatar */
  userAvatar?: string;
  /** Maximum height of chat area */
  maxHeight?: number;
  /** Whether to auto-scroll to bottom */
  autoScroll?: boolean;
  /** Custom styling */
  className?: string;
  /** Error state */
  error?: string;
  /** Function to clear error */
  onClearError?: () => void;
  /** Whether chat is disabled */
  disabled?: boolean;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    sources?: string[];
    confidence?: number;
    tokens?: number;
  };
}
```

### Usage Examples

#### Basic Chat Implementation

```tsx
function BasicAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call your AI service
      const response = await aiService.sendMessage(message);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        metadata: {
          confidence: response.confidence,
          tokens: response.tokens
        }
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI response failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIChatBox
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      placeholder="Ask me anything..."
      title="AI Assistant"
    />
  );
}
```

#### Chat with Welcome Message

```tsx
function WelcomeAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const welcomeConfig = {
    title: "Welcome to AI Assistant",
    subtitle: "I'm here to help you with your questions. Try asking about:",
    suggestions: [
      "How can I improve my productivity?",
      "Explain machine learning basics",
      "Help me write a professional email",
      "What are best practices for React development?"
    ]
  };

  return (
    <AIChatBox
      messages={messages}
      onSendMessage={handleSendMessage}
      welcomeMessage={welcomeConfig}
      title="Smart Assistant"
      showAIAvatar={true}
      showUserAvatar={true}
    />
  );
}
```

#### Advanced Chat with Error Handling

```tsx
function AdvancedAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSendMessage = async (message: string) => {
    setError('');
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          history: messages.slice(-10) // Send last 10 messages for context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: data.content,
        timestamp: new Date(),
        metadata: {
          sources: data.sources,
          confidence: data.confidence,
          tokens: data.tokens
        }
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Sorry, I encountered an error. Please try again.');
      console.error('AI chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AIChatBox
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        error={error}
        onClearError={() => setError('')}
        placeholder="Type your message here..."
        title="Advanced AI Assistant"
        maxHeight={600}
        autoScroll={true}
        showAIAvatar={true}
        aiAvatar="/images/ai-avatar.png"
        userAvatar="/images/user-avatar.png"
        className="border border-gray-200 rounded-lg shadow-sm"
      />
    </div>
  );
}
```

#### Contextual Chat Integration

```tsx
function DocumentAIChat({ document }: { document: Document }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with document context
  useEffect(() => {
    const contextMessage: ChatMessage = {
      id: 'context',
      type: 'system',
      content: `I'm ready to help you with questions about "${document.title}". What would you like to know?`,
      timestamp: new Date()
    };
    setMessages([contextMessage]);
  }, [document]);

  const handleSendMessage = async (message: string) => {
    // Implementation with document context
    // ... similar to previous examples but include document ID
  };

  const welcomeConfig = {
    title: `Ask about "${document.title}"`,
    subtitle: "I can help you understand and analyze this document.",
    suggestions: [
      "Summarize the main points",
      "What are the key findings?",
      "Explain complex concepts",
      "Find specific information"
    ]
  };

  return (
    <AIChatBox
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      welcomeMessage={welcomeConfig}
      title="Document Assistant"
      placeholder={`Ask about ${document.title}...`}
      className="h-96"
    />
  );
}
```

## 🌓 LightDarkModeToggle

A toggle component for switching between light and dark themes with smooth animations and system preference detection.

### Import

```tsx
import { LightDarkModeToggle } from '@your-org/design-system';
```

### Props

```tsx
interface LightDarkModeToggleProps {
  /** Current theme mode */
  mode: 'light' | 'dark' | 'system';
  /** Function to handle mode change */
  onModeChange: (mode: 'light' | 'dark' | 'system') => void;
  /** Toggle size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show labels */
  showLabels?: boolean;
  /** Whether to include system preference option */
  includeSystem?: boolean;
  /** Custom styling */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Icon variant */
  iconVariant?: 'sun-moon' | 'contrast' | 'palette';
}
```

### Usage Examples

#### Basic Theme Toggle

```tsx
function BasicThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <LightDarkModeToggle
      mode={theme}
      onModeChange={handleThemeChange}
      size="md"
      showLabels={true}
      includeSystem={true}
    />
  );
}
```

#### Theme Toggle with Context

```tsx
import { createContext, useContext, useEffect, useState } from 'react';

// Theme Context
const ThemeContext = createContext<{
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}>({
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'light'
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => {
        const isDark = mediaQuery.matches;
        setResolvedTheme(isDark ? 'dark' : 'light');
        root.classList.toggle('dark', isDark);
      };
      
      updateTheme();
      mediaQuery.addEventListener('change', updateTheme);
      
      return () => mediaQuery.removeEventListener('change', updateTheme);
    } else {
      const isDark = theme === 'dark';
      setResolvedTheme(isDark ? 'dark' : 'light');
      root.classList.toggle('dark', isDark);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// Usage in component
function ThemedToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <LightDarkModeToggle
      mode={theme}
      onModeChange={setTheme}
      size="lg"
      showLabels={false}
      iconVariant="sun-moon"
    />
  );
}
```

#### Compact Theme Toggle

```tsx
function CompactThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Theme:</span>
      <LightDarkModeToggle
        mode={theme}
        onModeChange={setTheme}
        size="sm"
        showLabels={false}
        includeSystem={false}
        className="border border-gray-300 rounded-md"
      />
    </div>
  );
}
```

#### Settings Panel Integration

```tsx
function SettingsPanel() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-gray-600">
            Customize how the interface looks and feels
          </p>
        </div>
        <LightDarkModeToggle
          mode={theme}
          onModeChange={setTheme}
          size="lg"
          showLabels={true}
          includeSystem={true}
        />
      </div>
      
      <div className="text-sm text-gray-500">
        Current theme: {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
        {theme === 'system' && ' (System preference)'}
      </div>
    </div>
  );
}
```

## 🛠️ Additional Utilities

### Copy to Clipboard

A utility component for copying text to the clipboard with visual feedback.

```tsx
interface CopyToClipboardProps {
  text: string;
  children?: React.ReactNode;
  onCopy?: () => void;
  successMessage?: string;
}

function CopyToClipboard({ text, children, onCopy, successMessage = 'Copied!' }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Tooltip content={copied ? successMessage : 'Copy to clipboard'}>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
      >
        {children || (
          <>
            <ClipboardIcon className="w-4 h-4" />
            Copy
          </>
        )}
      </button>
    </Tooltip>
  );
}

// Usage
<CopyToClipboard 
  text="npm install @your-org/design-system"
  onCopy={() => console.log('Installation command copied')}
>
  <Button variant="outline" size="sm">
    <ClipboardIcon className="w-4 h-4 mr-2" />
    Copy Install Command
  </Button>
</CopyToClipboard>
```

### Keyboard Shortcut Display

A component for displaying keyboard shortcuts in a consistent format.

```tsx
interface KeyboardShortcutProps {
  keys: string[];
  className?: string;
}

function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">+</span>}
          <kbd className="px-2 py-1 text-xs font-medium bg-gray-100 border border-gray-300 rounded">
            {key}
          </kbd>
        </React.Fragment>
      ))}
    </div>
  );
}

// Usage
<KeyboardShortcut keys={['Cmd', 'K']} />
<KeyboardShortcut keys={['Ctrl', 'Shift', 'P']} />
```

### Scroll to Top

A floating button that appears when scrolling and smoothly scrolls to top when clicked.

```tsx
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

## ♿ Accessibility

Utility components include comprehensive accessibility features:

### AIChatBox
- **Screen Reader Support**: Messages are announced as they appear
- **Keyboard Navigation**: Full keyboard support for input and interaction
- **ARIA Labels**: Proper labeling for chat regions and controls
- **Focus Management**: Maintains focus context during conversations

### LightDarkModeToggle
- **High Contrast**: Ensures sufficient contrast in all theme modes
- **Keyboard Support**: Space and Enter keys toggle theme
- **Screen Reader Announcements**: Theme changes are announced
- **System Preference Respect**: Honors user's OS theme preference

```tsx
// Accessible AI chat
<AIChatBox
  messages={messages}
  onSendMessage={handleSendMessage}
  aria-label="AI conversation"
  role="log"
  aria-live="polite"
/>

// Accessible theme toggle
<LightDarkModeToggle
  mode={theme}
  onModeChange={setTheme}
  aria-label="Switch theme"
  showLabels={true}
/>
```

## 🎨 Theming

Utility components automatically adapt to the current theme:
- Chat interfaces use theme-appropriate colors and contrast
- Theme toggle reflects current state visually
- All interactive elements maintain accessibility standards
- Animations and transitions respect reduced motion preferences

## 🔧 Customization

Utility components support extensive customization:

```tsx
// Custom styled AI chat
<AIChatBox
  messages={messages}
  onSendMessage={handleSendMessage}
  className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200"
  maxHeight={500}
  title="Custom AI Assistant"
  aiAvatar="/custom-ai-avatar.svg"
/>

// Custom theme toggle
<LightDarkModeToggle
  mode={theme}
  onModeChange={setTheme}
  className="bg-white shadow-lg border border-gray-200 rounded-full p-1"
  size="lg"
  iconVariant="palette"
/>
```

## 💡 Best Practices

1. **AI Chat**: Provide clear error states and loading indicators
2. **Theme Toggle**: Respect system preferences as default
3. **Performance**: Optimize chat message rendering for large conversations
4. **Privacy**: Handle AI interactions securely and transparently
5. **Accessibility**: Ensure all utilities work with assistive technologies
6. **State Management**: Use proper state management for complex interactions
7. **Error Handling**: Provide graceful fallbacks for utility failures 