/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Proxima Nova', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#5C6BC0',
        secondary: '#3949AB',
        background: '#FAFAFA',
        card: '#FFFFFF',
        border: '#E0E0E0',
        textPrimary: '#212121',
        textSecondary: '#757575',
        muted: '#BDBDBD',
      },
    },
  },
  plugins: [],
}