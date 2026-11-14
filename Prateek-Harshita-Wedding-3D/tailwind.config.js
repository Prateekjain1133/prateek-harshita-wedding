export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7EF', peach: '#E8D9C5', blush: '#E7D7D5', gold: '#B9975B', brown: '#542B32', sage: '#A9B89E',
        maroon: '#2A0D13', wine: '#4A1722', emerald: '#14382F', goldlight: '#E6C77E',
      },
      fontFamily: {
        hindi: ['"Tiro Devanagari Hindi"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
};
