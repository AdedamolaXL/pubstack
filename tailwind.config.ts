module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFE8D9',
          200: '#FFD0B3',
          300: '#FFB08C',
          400: '#FF8A5C',
          500: '#FF6719', // Primary orange
          600: '#E65C00',
          700: '#CC5200',
          800: '#B34700',
          900: '#993D00',
        },
        dune: {
          50: '#F5F4F2',
          100: '#E8E6E1',
          200: '#D5D2CA',
          300: '#BDB9AD',
          400: '#A8A392',
          500: '#8C8876',
          600: '#726E5E',
          700: '#59564A',
          800: '#403E35',
          900: '#2B2823', // Dune
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB', // Border color
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280', // Secondary text
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Lora', 'ui-serif', 'Georgia'], // Substack-like serif font
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #FF6719, #E65C00)',
      }
    }
  },
  plugins: [],
}