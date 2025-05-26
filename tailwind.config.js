/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        xxs:  ['0.625rem', { lineHeight: '1' }],      // 10px
        xs:   ['0.75rem',  { lineHeight: '1' }],      // 12px
        sm:   ['0.875rem', { lineHeight: '1.5' }],    // 14px
        base: ['1rem',     { lineHeight: '1.625' }],  // 16px
        lg:   ['1.125rem', { lineHeight: '1.625' }],  // 18px
        xl:   ['1.25rem',  { lineHeight: '1.625' }],  // 20px
        '2xl':['1.5rem',   { lineHeight: '1.25' }],   // 24px
        '3xl':['1.875rem', { lineHeight: '1.25' }],   // 30px
        '4xl':['2.25rem',  { lineHeight: '1.25' }],   // 36px
      },
      fontWeight: {
        light:   '300',
        normal:  '400',
        medium:  '500',
        semibold:'600',
        bold:    '700',
      },
      lineHeight: {
        none:    '1',
        tight:   '1.25',
        normal:  '1.5',
        relaxed: '1.625',
        loose:   '1.825',
      },
      letterSpacing: {
        tight:  '-0.025em',
        normal: '0',
        wide:   '0.025em',
        wider:  '0.05em',
      },
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#17314a',
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
          50: '#ebf9f7',
          500: '#0fa892',
          700: '#0b7a6a',
        },
        warning: {
          50: '#ffd7c7',
          500: '#ff976b',
          700: '#f26f38',
        },
        error: {
          50: '#ffeded',
          100: '#ffc9c9',
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
          primary: '#17314a',  
          secondary: '#829ab1',  
          positive: '#0fa892', 
          negative: '#e34242',  
          alt: '#bcccdc',  
          highlight: '#f6ad55',  
        }
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.275rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '1rem',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        xs:   '0.25rem',
        sm:   '0.5rem',
        md:   '1rem',
        lg:   '1.5rem',
        xl:   '2rem',
        '2xl':'3rem',
      },
    },
  },
  plugins: [],
};
