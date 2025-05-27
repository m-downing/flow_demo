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
    bg: designSystemColors.neutral[100],      // Light mode header background
    color: designSystemColors.neutral[900],    // Light mode header text
    fontFamily: getTypography.fontFamily('body'),
    fontSize: getTypography.fontSize('sm'),
    fontWeight: getTypography.fontWeight('semibold'),
    lineHeight: getTypography.lineHeight('sm'),
    letterSpacing: getTypography.letterSpacing('normal'),
    height: '40px',
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.primary[600]}`,  // Dark mode: primary-600 to match other components
    },
    // Dark mode variants - using primary colors to match other components
    darkBg: designSystemColors.primary[900],    // Dark mode: primary-900 like Select/FilterBar
    darkColor: designSystemColors.primary[100], // Dark mode: primary-100 for good contrast like Select
    darkBorder: `1px solid ${designSystemColors.primary[600]}`, // Dark mode border - primary-600
  },
  footer: {
    // Footer styling to match header
    bg: designSystemColors.neutral[100],      // Same as header bg for consistency
    color: designSystemColors.neutral[700],    // Slightly lighter text than header
    fontFamily: getTypography.fontFamily('body'),
    fontSize: getTypography.fontSize('sm'),
    fontWeight: getTypography.fontWeight('normal'),
    lineHeight: getTypography.lineHeight('sm'),
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.primary[600]}`,  // Dark mode: primary-600
    },
    // Dark mode variants to match header
    darkBg: designSystemColors.primary[900],    // Dark mode: primary-900
    darkColor: designSystemColors.primary[300], // Dark mode: primary-300 for footer text
    darkBorder: `1px solid ${designSystemColors.primary[600]}`, // Dark mode border
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
    height: '48px',    
    zebraBg: designSystemColors.neutral[50],    // Using neutral[50] for zebra striping
    hoverBg: {
      light: designSystemColors.primary[50],    // Light mode hover background
      dark: designSystemColors.primary[800],    // Dark mode hover background - primary-800
    },
    fontFamily: getTypography.fontFamily('body'),
    fontSize: getTypography.fontSize('sm'),
    fontWeight: getTypography.fontWeight('normal'),
    lineHeight: getTypography.lineHeight('sm'),
    color: designSystemColors.neutral[800],    // Light mode row text
    // Dark mode variants - using primary colors to match other components
    darkBg: designSystemColors.primary[700],   // Dark mode row background - primary-700 as requested
    darkColor: designSystemColors.primary[100], // Dark mode row text color - primary-100 like Select
    // Light and dark mode border variants
    borderBottom: {
      light: `1px solid ${designSystemColors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.primary[700]}`,  // Dark mode: primary-700 for subtle borders
    },
  },
  scrollbar: {
    width: '6px',   // Made thinner (was 8px)
    borderRadius: '3px', // Added border radius for modern look
    light: {
      track: designSystemColors.neutral[100],  // Light mode: neutral-100 for track background
      thumb: designSystemColors.neutral[200],  // Light mode: neutral-200 for scrollbar thumb
      thumbHover: designSystemColors.neutral[300], // Light mode: neutral-300 for hover state
    },
    dark: {
      track: designSystemColors.primary[900],  // Dark mode: primary-900 for track background
      thumb: designSystemColors.primary[700],  // Dark mode: primary-700 for scrollbar thumb
      thumbHover: designSystemColors.primary[600], // Dark mode: primary-600 for hover state
    }
  },
  container: {
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.primary[700]}`,  // Dark mode: primary-700
    },
    borderRadius: '4px', 
    shadow: designSystemShadows.md,                   // Using md from shadows
  },
}; 