/**
 * Enterprise Design System Typography Tokens
 * 
 * This module provides typography tokens in the format expected by Tailwind CSS
 * while also exporting utility functions for component consumption.
 * 
 * Architecture:
 * - Primary export matches Tailwind's expected structure exactly
 * - Utility functions provide clean interfaces for component usage
 * - Type-safe throughout with proper TypeScript definitions
 */

// Base typography scale following design system standards
const typographyScale = {
  fontFamily: {
    heading: ['var(--font-heading)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    body: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  },
  fontSize: {
    xxs: ['0.625rem', { lineHeight: '1' }],      // 10px
    xs: ['0.75rem', { lineHeight: '1' }],        // 12px
    sm: ['0.875rem', { lineHeight: '1.5' }],     // 14px
    base: ['1rem', { lineHeight: '1.625' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.625' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.625' }],    // 20px
    '2xl': ['1.5rem', { lineHeight: '1.5' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '1.4' }],  // 30px
    '4xl': ['2.25rem', { lineHeight: '1.3' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1.2' }],      // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
  },
} as const;

// Type definitions for type safety
export type FontSizeKey = keyof typeof typographyScale.fontSize;
export type FontWeightKey = keyof typeof typographyScale.fontWeight;
export type FontFamilyKey = keyof typeof typographyScale.fontFamily;
export type LineHeightKey = keyof typeof typographyScale.lineHeight;
export type LetterSpacingKey = keyof typeof typographyScale.letterSpacing;

// Utility functions for component consumption
export const getTypography = {
  /**
   * Get font family as CSS-compatible string
   */
  fontFamily: (key: FontFamilyKey): string => {
    return typographyScale.fontFamily[key].join(', ');
  },
  
  /**
   * Get font size value (without line height)
   */
  fontSize: (key: FontSizeKey): string => {
    const value = typographyScale.fontSize[key];
    // All fontSize values are tuples, so we always take the first element
    return value[0];
  },
  
  /**
   * Get line height from fontSize token or dedicated lineHeight token
   */
  lineHeight: (fontSizeKey?: FontSizeKey, lineHeightKey?: LineHeightKey): string => {
    if (lineHeightKey) {
      return typographyScale.lineHeight[lineHeightKey];
    }
    
    if (fontSizeKey) {
      const value = typographyScale.fontSize[fontSizeKey];
      if (Array.isArray(value) && typeof value[1] === 'object' && 'lineHeight' in value[1]) {
        return value[1].lineHeight;
      }
    }
    
    return typographyScale.lineHeight.normal;
  },
  
  /**
   * Get font weight value
   */
  fontWeight: (key: FontWeightKey): string => {
    return typographyScale.fontWeight[key];
  },
  
  /**
   * Get letter spacing value
   */
  letterSpacing: (key: LetterSpacingKey): string => {
    return typographyScale.letterSpacing[key];
  },
  
  /**
   * Get complete typography style object for a given font size
   */
  textStyle: (fontSizeKey: FontSizeKey, fontFamilyKey: FontFamilyKey = 'body') => {
    return {
      fontFamily: getTypography.fontFamily(fontFamilyKey),
      fontSize: getTypography.fontSize(fontSizeKey),
      lineHeight: getTypography.lineHeight(fontSizeKey),
      fontWeight: typographyScale.fontWeight.normal,
      letterSpacing: typographyScale.letterSpacing.normal,
    };
  },
};

// Primary export for Tailwind configuration (exact format Tailwind expects)
export const typography = typographyScale;

// Default export for convenience
export default typography; 