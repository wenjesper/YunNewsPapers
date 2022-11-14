/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 给 border-radius 加 50% 值
      borderRadius: {
        'half': '50%'
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'sinaweibo': '#e6162d',
        'zhihu': "#0084ff"
       })
    },
  },
  darkMode: 'class',
  plugins: [],
}
