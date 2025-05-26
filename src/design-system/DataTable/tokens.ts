// IMPORTANT: The following token files are assumed to exist at ../../components/design-system/tokens/
// - colors.ts
// - typography.ts
// - shadows.ts
// Please ensure they export the necessary tokens with the expected structure.

import { colors as designSystemColors } from '../foundations/tokens/colors';
import { typography as designSystemTypography } from '../foundations/tokens/typography';
import { shadows as designSystemShadows } from '../foundations/tokens/shadows';

export const tableTokens = {
  header: {
    bg: designSystemColors.colors.neutral[100],      // Changed to neutral[200] for light mode header background
    color: designSystemColors.colors.neutral[900],    // Using neutral[900] for header text
    fontFamily: designSystemTypography.fontFamily.body,
    fontSize: designSystemTypography.fontSize.sm,
    fontWeight: designSystemTypography.fontWeight.semibold,
    lineHeight: designSystemTypography.lineHeight.tight,
    letterSpacing: designSystemTypography.letterSpacing.normal,
    height: '40px',
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.colors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.colors.primary[900]}`,  // Dark mode: primary-900
    },
    // Dark mode variants
    darkBg: designSystemColors.colors.primary[900],    // Dark mode: primary[600] to match pagination
    darkColor: designSystemColors.colors.primary[100], // Dark mode: primary[100] for better contrast
    darkBorder: `1px solid ${designSystemColors.colors.primary[700]}`, // Dark mode border
  },
  footer: {
    // Footer styling to match header
    bg: designSystemColors.colors.neutral[100],      // Same as header bg for consistency
    color: designSystemColors.colors.neutral[700],    // Slightly lighter text than header
    fontFamily: designSystemTypography.fontFamily.body,
    fontSize: designSystemTypography.fontSize.sm,
    fontWeight: designSystemTypography.fontWeight.normal,
    lineHeight: designSystemTypography.lineHeight.normal,
    // Light and dark mode border variants
    border: {
      light: `1px solid ${designSystemColors.colors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.colors.primary[600]}`,  // Dark mode: primary-600
    },
    // Dark mode variants to match header
    darkBg: designSystemColors.colors.primary[700],    // Dark mode: primary[700] to match pagination
    darkColor: designSystemColors.colors.primary[300], // Dark mode: primary[300] for text
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
    height: '36px',    // Placeholder: typography.ts does not have explicit sizing tokens like 'rowHeight'
    zebraBg: designSystemColors.colors.neutral[50],    // Using neutral[50] for zebra striping
    hoverBg: {
      light: designSystemColors.colors.primary[50],    // Light mode hover background
      dark: designSystemColors.colors.primary[800],    // Dark mode hover background
    },
    fontFamily: designSystemTypography.fontFamily.body,
    fontSize: designSystemTypography.fontSize.sm,
    fontWeight: designSystemTypography.fontWeight.normal,
    lineHeight: designSystemTypography.lineHeight.normal,
    color: designSystemColors.colors.neutral[800],    // Using neutral[800] for row text
    // Dark mode variants
    darkBg: designSystemColors.colors.primary[900],   // Dark mode row background
    darkColor: designSystemColors.colors.primary[100], // Dark mode row text color
    // Light and dark mode border variants
    borderBottom: {
      light: `1px solid ${designSystemColors.colors.neutral[300]}`, // Light mode: neutral-300
      dark: `1px solid ${designSystemColors.colors.primary[600]}`,  // Dark mode: primary-600
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
      dark: `1px solid ${designSystemColors.colors.primary[900]}`,  // Dark mode: primary-900
    },
    borderRadius: '4px', // Placeholder: typography.ts does not have explicit radii tokens like 'medium' - using a common value
    shadow: designSystemShadows.md,                   // Using md from shadows
  },
}; 