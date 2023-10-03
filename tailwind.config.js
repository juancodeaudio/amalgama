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
        magilio: ['var(--font-magilio)', 'sans-serif']
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
            primary: '#ce36c2'
          }
        },
        dark: {
          colors: {
            background: '#1b1b1b',
            primary: '#ce36c2'
          }
        },
      },
    })
  ],
}
