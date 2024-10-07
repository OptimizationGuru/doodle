/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx}'],
  theme: {
    extend: {
      screens: {
        'xs': { min: '360px', max: '639px' },
        'sm': { min: '640px', max: '767px' }, // Small tablets and large phones
        'md': { min: '768px', max: '1023px' }, // Tablets and smaller laptops
        'lg': { min: '1024px', max: '1279px' }, // Laptops and smaller desktops
        'xl': { min: '1280px', max: '1535px' }, // Larger desktops and full-size monitors
        '2xl': { min: '1536px' , max: '5535px'}, // Very large screens and widescreen monitors
      },
    },
  },
  plugins: [],
}
