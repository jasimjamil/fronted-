/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          dark: '#1A1C22',
          medium: '#5A5C6A',
          light: '#A7ABB2'
        },
        primary: {
          DEFAULT: '#1A1C22',
          50: '#4A4E58',
          100: '#3A3E46',
          200: '#2A2E36',
          300: '#1A1C22',
          400: '#0A0C12',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000'
        },
        secondary: {
          DEFAULT: '#5A5C6A',
          50: '#8A8C9A',
          100: '#7A7C8A',
          200: '#6A6C7A',
          300: '#5A5C6A',
          400: '#4A4C5A'
        },
        accent: {
          DEFAULT: '#A7ABB2',
          50: '#D7DBE2',
          100: '#C7CBD2',
          200: '#B7BBC2',
          300: '#A7ABB2'
        }
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #1A1C22, #5A5C6A)',
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(26, 28, 34, 0.1), 0 2px 4px -1px rgba(26, 28, 34, 0.06)',
        'soft': '0 2px 4px rgba(26, 28, 34, 0.1)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)'
      },
      borderRadius: {
        'large': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem'
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'bounce': 'bounce 1s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        bounce: {
          '0%, 100%': { 
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
      perspective: {
        '1000': '1000px'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform'
      }
    },
  },
  plugins: [],
}; 