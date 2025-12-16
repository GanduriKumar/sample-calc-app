/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calculator: {
          dark: '#2c3e50',
          darker: '#1a252f',
          light: '#ecf0f1',
          blue: '#3498db',
          orange: '#e67e22',
          red: '#e74c3c',
          green: '#27ae60',
          gray: '#7f8c8d',
        }
      },
      boxShadow: {
        'calculator': '0 10px 40px rgba(0, 0, 0, 0.4)',
        'button': '0 3px 8px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}