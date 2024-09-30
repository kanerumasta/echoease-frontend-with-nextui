import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
        animation: {
            'bounce': 'bounce 3s linear infinite',
            'wiggle': 'wiggle 1s ease-in-out infinite',
            'rotate-x': 'rotate-x 1s ease-in-out infinite'
          },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        'rotate-x': {
        '0%': { transform: 'rotateY(0deg)' },
        '50%': { transform: 'rotateY(180deg)' },
        '100%': { transform: 'rotateY(0deg)' },
      },
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
