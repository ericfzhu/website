const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        './src/pages/**/*.{html,js,ts,jsx,tsx}',
        './src/components/**/*.{html,js,ts,jsx,tsx}',
        'public/',
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Helvetica Neue', 'sans-serif'],
        },
    },
    plugins: [],
}
