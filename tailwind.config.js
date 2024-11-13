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
        backgroundImage:{
            'mic-background':"url('/media/micBG.jpeg')",
            'girl-music':"url('/media/girl-music.jpg')",
            'wave':"url('/media/wave.png')",
            'neon-mic':"url('/media/neon-mic.png')",
            'hero-girl':"url('/media/hero-girl.png')",
        },
        animation: {
            'bounce': 'bounce 3s linear',
            'wiggle': 'wiggle 0.5s ease-in-out',
            'rotate-x': 'rotate-x 1s ease-in-out infinite',
            'fade': 'fadeIn 0.5s ease-in-out forwards',
            'fadeOut': 'fadeOut 0.5s ease-in-out forwards',
            'thumbnail': 'thumbnailHover 0.3s ease-in-out forwards',
            'slideIn': 'slideInLeft 0.5s ease-in-out forwards',
            'bando': 'bando 1s ease forwards',
            'text':'text 5s ease infinite'
          },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        'rotate-x': {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        'fadeIn': {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'fadeOut': {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.9)' },
        },
        'thumbnailHover': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(1.05)', opacity: 0.9 },
        },
        'slideInLeft': {
          '0%': { opacity: 0, transform: 'translateX(-10%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'bando': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        'text': {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center',
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center',
            },
          },
        }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
