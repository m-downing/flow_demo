/**
 * Design system color tokens
 * This is the single source of truth for all color values in the design system.
 */

const colors = {
  primary: {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#17314a', //  primary color
    700: '#10273b',
    800: '#091d2d',
    900: '#030e19',
  },
  neutral: {
    50: '#fcfcfc',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#121212',
  },
  success: {
    50:  '#ebf9f7',
    500: '#0fa892',
    700: '#0b7a6a',
  },
  warning: {
    50:  '#ffd7c7',
    500: '#ff976b',
    700: '#f26f38',
  },
  error: {
    50:  '#ffeded',
    100:  '#ffc9c9',
    300: '#e05353',
    500: '#e34242',
  },
  red: {
    50: '#ffdede',
  },
  purple: {
    50: '#f6f5fc',
    100: '#ede9fe',
    200: '#ddd6fe',
    500: '#8b5cf6',
    700: '#7c3aed',
    900: '#4c00b0'
  },
  green: {
    50: '#f7fffa',
    500: '#199447',
    700: '#196937',
  },
  teal: {
    50: '#faffff',
    100: '#ccfbf1',
    200: '#99f6e4',
    500: '#14b8a6',
    700: '#00B5CC',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    500: '#f59e0b',
    700: '#d97706',
  },
  yellow: {
    50: '#fff6d9',
    100: '#fef9c3',
    200: '#fef08a',
    500: '#d6c242',
    700: '#8b4513',
  },
  brown: {
    50: '#fbf7ee',
    700: '#753f1d',
  },
  orange: {
    50: '#fff0e6',
    100: '#ffedd5',
    200: '#fed7aa',
    500: '#eb7c52',
    700: '#bf5e2a',
  },
  magenta: {
    100: '#fef7ff',
    700: '#7a3257',
  },
  blue: {
    50: '#fcfcfc',
    100: '#c2dbff',
    700: '#3266c2',
    900: '#0a388a'
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
  },
  dataViz: {
    primary:   '#17314a',  
    secondary: '#829ab1',  
    positive:  '#0fa892', 
    negative:  '#e34242',  
    alt:       '#bcccdc',  
    highlight: '#f6ad55',  
  },
};

// Badge color system - no inline styling required by developers
const badgeColors = {
  // Supply Chain Status Badges (Light bg / Dark text)
  planned: {
    bg: colors.primary[500],
    text: colors.primary[50],
  },
  ordered: {
    bg: colors.green[700],
    text: colors.neutral[50],
  },
  manufacturing: {
    bg: colors.primary[400],
    text: colors.blue[50],
  },
  qualityTesting: {
    bg: colors.blue[700],
    text: colors.blue[50],
  },
  readyToShip: {
    bg: colors.blue[900],
    text: colors.blue[50],
  },
  inTransit: {
    bg: colors.brown[700],
    text: colors.brown[50],
  },
  delivered: {
    bg: colors.teal[700],
    text: colors.teal[50],
  },
  installing: {
    bg: colors.purple[700],
    text: colors.purple[50],
  },
  active: {
    bg: colors.green[500],
    text: colors.success[50],
  },
  maintenance: {
    bg: colors.magenta[700],
    text: colors.magenta[100],
  },
  delayed: {
    bg: colors.error[500],
    text: colors.neutral[50],
  },
  
  // Priority/Risk Badges (Sophisticated dark bg / Light text)
  critical: {
    bg: colors.error[500],
    text: colors.error[50],
  },
  highPriority: {
    bg: colors.amber[700],
    text: colors.neutral[50],
  },
  standard: {
    bg: colors.blue[700],
    text: colors.blue[50],
  },
  atRisk: {
    bg: colors.amber[700],
    text: colors.neutral[50],
  },
};

// ES module exports for TypeScript
export {
  colors,
  badgeColors,
}; 