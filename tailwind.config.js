import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        magilio: ['var(--font-magilio)', 'sans-serif'],
        migha: ['var(--font-migha)', 'sans-serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      themes: {
        light: {
          colors: {
            background: '#f5f5f5',
            foreground: "#2B2B30",
            primary: '#E395E0',
            secondary: '#B9BCF3',
          }
        },
        dark: {
          colors: {
            background: '#2B2B30',
            foreground: '#f5f5f5',
            primary: '#E395E0',
            secondary: '#B9BCF3'
          }
        },
      },
    })
  ],
}
