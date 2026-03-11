/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A2E',
        secondary: '#C9A84C',
        accent: '#E8D5A3',
        background: '#FAF9F6',
        foreground: '#1A1A2E'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif']
      },
      maxWidth: { '8xl': '1280px' }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};