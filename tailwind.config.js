const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        './src/pages/**/*.{html,js,ts,jsx,tsx}',
        './src/components/**/*.{html,js,ts,jsx,tsx}',
        'public/',
    ],
    theme: {
        extend: {
            cursor: {
                'mac-cursor': `url('/assets/cursor.svg'), default`,
            },
            colors: {
                accent: '#70A3F2',
            },
        },
        fontFamily: {
            sans: ['Helvetica Neue', 'sans-serif'],
        },
    },
    extend: {},
    plugins: [],
}
