// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Make sure the `content` paths match your app structure
    './pages/**/*.{js,ts,jsx,tsx}', // If you're using pages folder
    './components/**/*.{js,ts,jsx,tsx}', // If you have a components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
