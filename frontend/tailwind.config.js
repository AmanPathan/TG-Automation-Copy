/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src//*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'button': '#4CAF50', // Green button background
        "background": "#F5F5F5", // Light gray background
        "primary": "#2196F3", // Blue primary background
        "secondary": "#FFC107", // Yellow secondary background
        "accent": "#FF5722", // Orange accent background
        "deepBlue":"#283593", // Deep blue background
      },
      textColor: {
        "text1": "#333333", // Dark text color
        "accent": "#FF5722", // Orange accent text color
        "primary":"#2196F3", // Blue primary text color
      },
      borderColor:{
        "border1":"#E0E0E0", // Light gray border color
      },
    },
  },
  plugins: [],
}