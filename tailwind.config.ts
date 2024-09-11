import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        normal: ['CircularStd-Book', 'system-ui'],
        medium: ['CircularStd-Medium', 'system-ui'],
        semibold: ['CircularStd-SemiBold', 'system-ui'],
        bold: ['CircularStd-Bold', 'system-ui'],
        black: ['CircularStd-Black', 'system-ui'],
      },
      boxShadow: {
        '3xl': '0px 15px 35px rgba(13, 21, 55, 0.08)',
      },
      screens: {
        '2xl': {'max': '1535px'},
        'xl': {'max': '1279px'},
        'lg': {'max': '1023px'},
        'md': {'max': '767px'},
        'sm': {'max': '414px'},
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        '.scrollbar-hide': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ]
};

export default config;
