const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        './pages/**/*.{html,js,ts,jsx,tsx}',
        './components/**/*.{html,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Helvetica Neue', 'sans-serif'],
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities(
                {
                    '.scrollbar-hide': {
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    },
                    '.scrollbar-show': {
                        '-ms-overflow-style': 'auto',
                        'scrollbar-width': 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'block',
                        },
                    },
                },
                ['responsive']
            )
        }),
    ],
    variants: {
        width: ['responsive', 'hover', 'focus'],
    },
}
