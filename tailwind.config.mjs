/** @type {import('tailwindcss').Config} */

// Import design tokens from the design system
import { colors } from './src/design-system/foundations/tokens/colors.js';
import { typography } from './src/design-system/foundations/tokens/typography.js';
import { spacing } from './src/design-system/foundations/tokens/spacing.js';
import { borderRadius } from './src/design-system/foundations/tokens/borderRadius.js';
import { shadows } from './src/design-system/foundations/tokens/shadows.js';

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Use design tokens directly
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      colors,
      borderRadius,
      boxShadow: shadows,
      spacing,
    },
  },
  plugins: [],
};
