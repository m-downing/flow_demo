// IMPORTANT: The following token files are assumed to exist at ../../components/design-system/tokens/
// - colors.ts
// - typography.ts
// - shadows.ts
// Please ensure they export the necessary tokens with the expected structure.

import { colors as designSystemColors } from '../foundations/tokens/colors';
import { getTypography } from '../foundations/tokens/typography';
import { shadows as designSystemShadows } from '../foundations/tokens/shadows';

export const tableTokens = {
  header: {
    bg: designSystemColors.colors.neutral[100],      // Light mode header background
    color: designSystemColors.colors.neutral[900],    // Light mode header text
    fontFamily: getTypography.fontFamily('body'),
    fontSize: getTypography.fontSize('sm'),
    fontWeight: getTypography.fontWeight('semibold'),
    lineHeight: getTypography.lineHeight('sm'),
    letterSpacing: getTypography.letterSpacing('normal'),
    height: '40px',
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.colors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.colors.primary[600]}`,  // Dark mode: primary-600 to match other components
    },
    // Dark mode variants - using primary colors to match other components
    darkBg: designSystemColors.colors.primary[900],    // Dark mode: primary-900 like Select/FilterBar
    darkColor: designSystemColors.colors.primary[100], // Dark mode: primary-100 for good contrast like Select
    darkBorder: `1px solid ${designSystemColors.colors.primary[600]}`, // Dark mode border - primary-600
  },
  footer: {
    // Footer styling to match header
    bg: designSystemColors.colors.neutral[100],      // Same as header bg for consistency
    color: designSystemColors.colors.neutral[700],    // Slightly lighter text than header
    fontFamily: getTypography.fontFamily('body'),
    fontSize: getTypography.fontSize('sm'),
    fontWeight: getTypography.fontWeight('normal'),
    lineHeight: getTypography.lineHeight('sm'),
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.colors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.colors.primary[600]}`,  // Dark mode: primary-600
    },
    // Dark mode variants to match header
    darkBg: designSystemColors.colors.primary[900],    // Dark mode: primary-900
    darkColor: designSystemColors.colors.primary[300], // Dark mode: primary-300 for footer text
    darkBorder: `1px solid ${designSystemColors.colors.primary[600]}`, // Dark mode border
  },
  // Height variants for consistent table sizing
  heights: {
    compact: '320px',      // ~6-7 rows visible (good for summary cards)
    comfortable: '400px',  // ~8-9 rows visible (good for main content areas)
    spacious: '500px',     // ~11-12 rows visible (good for detail views)
    auto: 'auto',          // Let content determine height (good for summary mode)
    fill: '100%',          // Fill parent container
  },
  row: {
    height: '36px',    
    zebraBg: designSystemColors.colors.neutral[50],    // Using neutral[50] for zebra striping
    hoverBg: {
      light: designSystemColors.colors.primary[50],    // Light mode hover background
      dark: designSystemColors.colors.primary[800],    // Dark mode hover background - primary-800
    },
    fontFamily: getTypography.fontFamily('body'),
    fontSize: getTypography.fontSize('sm'),
    fontWeight: getTypography.fontWeight('normal'),
    lineHeight: getTypography.lineHeight('sm'),
    color: designSystemColors.colors.neutral[800],    // Light mode row text
    // Dark mode variants - using primary colors to match other components
    darkBg: designSystemColors.colors.primary[700],   // Dark mode row background - primary-700 as requested
    darkColor: designSystemColors.colors.primary[100], // Dark mode row text color - primary-100 like Select
    // Light and dark mode border variants
    borderBottom: {
      light: `1px solid ${designSystemColors.colors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.colors.primary[700]}`,  // Dark mode: primary-700 for subtle borders
    },
  },
  scrollbar: {
    width: '6px',   // Made thinner (was 8px)
    borderRadius: '3px', // Added border radius for modern look
    light: {
      track: designSystemColors.colors.neutral[100],  // Light mode: neutral-100 for track background
      thumb: designSystemColors.colors.neutral[200],  // Light mode: neutral-200 for scrollbar thumb
      thumbHover: designSystemColors.colors.neutral[300], // Light mode: neutral-300 for hover state
    },
    dark: {
      track: designSystemColors.colors.primary[900],  // Dark mode: primary-900 for track background
      thumb: designSystemColors.colors.primary[700],  // Dark mode: primary-700 for scrollbar thumb
      thumbHover: designSystemColors.colors.primary[600], // Dark mode: primary-600 for hover state
    }
  },
  container: {
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.colors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.colors.primary[700]}`,  // Dark mode: primary-700
    },
    borderRadius: '4px', 
    shadow: designSystemShadows.md,                   // Using md from shadows
  },
}; 